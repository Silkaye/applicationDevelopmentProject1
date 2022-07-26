import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth'
import { ref } from 'vue';

const errMsg = ref();

export default createStore({
  state: {
    user: null
  },
  getters: {
  },
  mutations: {
    
    SER_USER (state, user) {
      state.user = user
    },

    CLEAR_USER (state) {
      state.user = null
    }

  },
  actions: {
    async login ({ commit}, details) {
      const { email, password } = details

      if (email == '' && password == '') 
      {
        errMsg.value = 'Email and password fields cannot be empty'
        return
      }

      if( email == '')
      {
        errMsg.value = 'Email field cannot be empty';
        return;
      }

      if( password == '')
      {
        errMsg.value = 'Password field cannot be empty';
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            //alert('User not found')
            //errMsg.value = 'User not found'
            errMsg.value = 'User not found'
            break;
          case 'auth/wrong-password':
            //alert('Wrong password')
            errMsg.value = 'Wrong password'
            break;
          default:
            errMsg.value = "Something went wrong"
            //alert("Something went wrong")
        }

        return
      }

      commit('SER_USER', auth.currentUser)

      router.push('/')
    },

    async register ({ commit}, details) {
      const { email, password } = details

      if (email == '' && password == '') 
      {
        errMsg.value = 'Email and password fields cannot be empty'
        return
      }

      if( email == '')
      {
        errMsg.value = 'Email field cannot be empty';
        return;
      }

      if( password == '')
      {
        errMsg.value = 'Password field cannot be empty';
        return;
      }
      
      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            //alert('Email already in use')
            errMsg.value = 'An account with that Email already exists'
            break;
          case 'auth/invalid-email':
            //alert('Invalid email')
            errMsg.value = 'Invalid email'
            break;
          case 'auth/weak-password':
            //alert('Weak password')
            errMsg.value = 'Password is too weak'
            break;
          case 'auth/operation-not-allowed':
            //alert('Operation not allowed')
            errMsg.value = 'Operation not allowed'
            break;
          default:
            //alert("Something went wrong")
            errMsg.value = "Something went wrong"
        }
        return
      }

      commit('SER_USER', auth.currentUser)

      router.push('/')
    },

    async logout ({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/login')
    },

    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SER_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    },
  }
})

export { errMsg }
