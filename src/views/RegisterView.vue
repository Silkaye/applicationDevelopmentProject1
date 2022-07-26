<template>
    <main class="login">
        <section class="forms">
            <form class="register" @submit.prevent="register">
                <h2>Register</h2>
                <input 
                    type="email" 
                    placeholder="Email Address"
                    v-model="register_form.email">
                <input 
                    type="password"
                    placeholder="Password"
                    v-model="register_form.password">
                <input 
                    @click="loginLoader" 
                    type="submit"
                    value="register">
                <div>
                    <p v-if="errMsg" >{{ errMsg }}</p>
                    <br>
                </div>
                <p>Already have an account? 
                    <router-link class="button" to="/login">
                        <span class="text">login</span>
                    </router-link>
                </p>
            </form>

            <div v-if="loading" class="loader">
                <div>
                    <SpinnerLoader />
                </div>
            </div>
            
        </section>
    </main>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import SpinnerLoader from '@/components/SpinnerLoader.vue'
import { errMsg } from '@/store/index.js';

export default {
    setup () {
        const login_form = ref({});
        const register_form = ref({});
        const store = useStore();

        const login = () => {
            store.dispatch('login', login_form.value);
        }

        const register = () => {
            store.dispatch('register', register_form.value);
        }

        return{
            login_form,
            register_form,
            login,
            register,
            errMsg
        }
    },

    components: {
    SpinnerLoader
    },

    methods: {
        loginLoader(){
            this.loading=!false
            setTimeout(() => {
                this.loading=!true
            }, 2000);
        },

        registerLoad(){

        }
    },

    name: 'LoginView',
    data() {
        return {
            loading: false
        }
    }
}
</script>

<style scoped>
.loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
}

.forms {
	display: flex;
	max-height: 100vh;
    text-align: center;
}

form {
	flex: 1 1 0%;
	padding: 3rem 1rem 1rem;
}

h2 {
	font-size: 2rem;
	text-transform: uppercase;
	margin-bottom: 2rem;
}

input {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	display: block;
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	font-size: 1.5rem;
	margin-bottom: 2rem;
	padding: 0.5rem 0rem;
}
input:not([type="submit"]) {
	opacity: 0.8;
	transition: 0.4s;
}
input:focus:not([type="submit"]) {
	opacity: 1;
}
input::placeholder {
	color: inherit;
}
form.register input:not([type="submit"]) {
	color: #2c3e50;
	border-bottom: 2px solid #2c3e50;
}

form.register input[type="submit"] {
	background-color: var(--primary);
	color: #FFF;
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
}

</style>