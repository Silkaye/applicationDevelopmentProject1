<template>
    <main class="longjump">
        <div class="list-student">
            <div class="title has-text-centered">
                Add a student to the rollcall system
            </div>

            <form
                @submit.prevent="addStudent"
            >
                <div class="field is-grouped mb-5 has-text-weight-bold">
                    <p class="control is-expanded">
                      Name:
                        <input 
                            v-model="newStudentContent"
                            type="text" 
                            class="input mb-5 has-text-weight-medium" 
                            placeholder="Name"
                        >
                        Age:
                        <input 
                            v-model="newStudentAge"
                            type="text" 
                            class="input mb-5 has-text-weight-medium" 
                            placeholder="Age"
                        >
                        Gender:
                        <input 
                            v-model="newStudentGender"
                            type="text" 
                            class="input has-text-weight-medium" 
                            placeholder="Gender"
                        >
                    </p>
                </div>
                <p class="control has-text-centered mb-5">
                    <button 
                        :disabled="!newStudentContent + !newStudentAge + !newStudentGender"
                        class="button is-info"
                    >
                        Add Student
                    </button>
                </p>
                <p v-if="errMsg">
                  {{ errMsg }}
                </p>
            </form>
            
            <div 
                v-for="student in students"
                v-bind:key="student"
                class="card mb-5"
                :class="{ 'has-background-success-light': student.attendance }"
            >
                <div class="card-content">
                    <div class="content">
                        <div class="columns is-mobile is-vcentered">
                            <div 
                                class="column"
                                :class="{ 'has-text-success line-through' : student.attendance }"
                            >
                                {{ student.name }}
                            </div>
                            <div class="column is-5 has-text-right">
                                <button 
                                @click="deleteStudent(student.id, student.name)"
                                    class="button is-danger ml-2"
                                >
                                    &Cross;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { ref, onMounted } from 'vue'; 
    import { 
        collection, onSnapshot, addDoc, doc, 
        deleteDoc, query, orderBy,  
    } from 'firebase/firestore';
    import { db } from '@/firebase';

    const studentsCollectionRef = collection(db, "students")
    const studentsCollectionQuery = query(studentsCollectionRef, orderBy("name", "desc"));

    const students = ref([])

    onMounted(async () => {
        onSnapshot(studentsCollectionQuery, (querySnapshot) => {
            const fbStudents = [];
            querySnapshot.forEach((doc) => {
                const student = {
                    id: doc.id,
                    name: doc.data().name,
                    attendance: doc.data().attendance
                }
                fbStudents.push(student);
            });
            students.value = fbStudents;
        });
    })

    const newStudentContent = ref('')
    const newStudentAge = ref('')
    const newStudentGender = ref('')
    const errMsg = ref('')

    const addStudent = () => {
      let age = false
      let gender = false

      if(checkNumber(newStudentAge.value)) {
        age = true
      } else {
        errMsg.value = "Please enter a number for age"
      }

      if(newStudentGender.value === 'M' || newStudentGender.value === 'F') {
        gender = true
      } else {
        errMsg.value = "Please enter either 'M' or 'F' for gender"
      }

      if (age === true && gender === true) {
        addDoc(studentsCollectionRef, {
            name: newStudentContent.value,
            age: newStudentAge.value,
            gender: newStudentGender.value,
            attendance: false,
            date: Date.now()
        });
        newStudentContent.value = ''
        newStudentAge.value = ''
        newStudentGender.value = ''
        errMsg.value = ''
      }
    }

    const checkNumber = (value) => {
      return /^[0-9]+$/.test(value);
    }

    const deleteStudent = (id, name) => {
      if(confirm('Are you sure you want to delete student ' + name + '?')) {
            deleteDoc(doc(studentsCollectionRef, id));
      }
    }

    // const toggleDone = id => { 
    //     const index = students.value.findIndex(student => student.id === id)

    //     updateDoc(doc(studentsCollectionRef, id), {
    //         attendance: !students.value[index].attendance
    //     });
    // }


</script>

<style scoped src="bulma/css/bulma.min.css"></style>

<style scoped>

    .list-student {
        max-width: 800px;
        padding: 20px;
        margin: 0 auto;
    }

    .line-through {
        text-decoration: line-through;
    }

</style>