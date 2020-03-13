<template>
  <div class="register-page">
    <h3>Register</h3>
    <div id="form">
      <div class="form-container">
        <div class="container">
          <div class="separator-div">
            <form @submit.prevent="register()" id="register-form">
              <div id="name-register-form">
                <label for="name">Name</label>
                <input type="text" name="name" id="name-register" v-model="user.name" />
              </div>
              <div id="email-register-form">
                <label for="email">Email</label>
                <input type="email" name="email" id="email-register" v-model="user.email"/>
              </div>
              <div id="password-register-form">
                <label for="password">Password</label>
                <input type="text" name="password" id="password-register" v-model="user.password"/>
              </div>
              <div class="my-btn">
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Alert v-if="isError.status" :isError="isError" ></Alert>
    <div class="my-btn">
      already have an acoount? click here
      <button @click.prevent="showLogin()">back</button>
    </div>
  </div>
</template>
        
<script>
    import axios from "axios";
    import Alert from '../components/alert'

    const url = 'http://localhost:3000'
    export default {
        name:'Register',
        components:{
          Alert
        },
        data(){
          return {
            user:{
              name:'',
              email:'',
              password:''
            },
            isError:{
              status:false,
              msg:[]
            }
          }
        },
        methods: {
            register(){
                axios({
                    url:`${url}/user/register`,
                    method:'post',
                    data:{
                        name:this.user.name,
                        email:this.user.email,
                        password:this.user.password,
                        }
                }).then(data => {
                    console.log(data)
                    localStorage.setItem('access_token',data)
                    this.$emit('isLogin', true)
                }).catch(err =>{
                    console.log(err.response)
                    this.isError.status = true
                    this.isError.msg = err.response.data.msg.join(' and ')
                })
            },
            showLogin(){
              console.log('masuk')
                this.$emit('isRegister')
            },
            
        }
    };
</script>
        
<style>
</style>