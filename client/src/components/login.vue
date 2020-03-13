<template>
    <div class="login-page">
        <h3>Login</h3>
        <div class="form-container">
            <div class="container">
                <div id="form">
                    <form @submit.prevent="login()" id="login-form">
                        <div id="email-login-form">
                            <label for="email">Email</label>
                            <input @click="removeAlert()" type="text" name="email" id="email-login" v-model="user.email">
                        </div>
                        <div id="password-login-form">
                            <label for="password">Password</label>
                            <input @click="removeAlert()" type="password" name="password" id="password-login" v-model="user.password">
                        </div>
                        <div class="my-btn">
                            <button type="submit">Log In</button>
                        </div>
                    </form>
                    <div class="register-btn">
                        dont have an account yet?
                        <button @click.prevent="showRegister" id="to-register-btn">register here</button>
                    </div>
                </div>
            </div>
        </div>
        <GSign @isLogin="google_login" ></GSign>
    <Alert v-if="isError.status" :isError="isError" ></Alert>
        
    </div>
</template>
        
<script>
import axios from 'axios'
import Alert from '../components/alert'
import GSign from '../components/GSignIn'
const url = 'https://kanban-serve.herokuapp.com'

    export default {
        name:'Login',
        components:{
            Alert,
            GSign,
        },  
        data() {
            return {
                user:{
                    email:'',
                    password:''
                },
                isError:{
                    status:false,
                    msg:[]
                },
                isRegister: false,
            }
        },
         methods: {
            google_login(){
                this.$emit('isLogin',true)
            },
            login() {
                axios({
                    url: `${url}/user/login`,
                    method: 'post',
                    data: {
                        email: this.user.email,
                        password: this.user.password,
                    }
                })
                .then(data => {
                    localStorage.setItem('access_token', data.data.access_token)
                    this.$emit('isLogin',true)
                })
                .catch(err => {
                    // console.log(err.response,'=================')
                    this.isError.msg = err.response.data.msg
                    this.isError.status = true
                    console.log(this.isError,'===========')
                })
            },
            removeAlert(){
                this.$emit('isError.status',false) 
            },
            showRegister(){
                this.$emit('isRegister', true)
            },
        },
        mounted() {
            // console.log('login mounted')
            //  window.attachSignin(document.getElementById('google-sign-in-button'));
        }
    }

</script>
        
<style>
        
</style>