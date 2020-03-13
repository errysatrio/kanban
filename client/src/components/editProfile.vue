<template>
  <div class="register-page">
    <h3>Edit Your Profile</h3>
    <div id="form">
      <div class="form-container">
        <div class="container">
          <div class="separator-div">
            <form @submit.prevent="updateProfile" id="Edit-profile-form">
              <div id="name-Edit-profile-form">
                <label for="name">Name</label>
                <input type="text" name="name" id="name-Edit-profile" v-model="user.name" />
              </div>
              <div id="email-Edit-profile-form">
                <label for="email">Email</label>
                <input type="email" name="email" id="email-Edit-profile" v-model="user.email" />
              </div>
              <div id="password-Edit-profile-form">
                <label for="password">Password</label>
                <input
                  type="text"
                  name="password"
                  id="password-Edit-profile"
                  v-model="user.password"
                />
              </div>
              <div class="my-btn">
                <button type="submit">Edit-profile</button>
              </div>
            </form>
          </div>
        </div>
    <div class="my-btn">
      <button @click.prevent="cancel">Cancel</button>
      </div>
    </div>
    </div>
    <Alert v-if="isError.status" :isError="isError"></Alert>
  </div>
</template>

<script>
import axios from "axios";
import Alert from "../components/alert";
const url = 'http://localhost:3000'

export default {
  name: "Edit-Profile",
  components: {
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
    cancel(){
      this.$emit('isProfile', false)
    },
    updateProfile(){
      axios({
        url:`${url}/user`,
        method:'put',
        headers:{
          access_token:localStorage.access_token
        },
        data:{
          name:this.user.name,
          email:this.user.email,
          password:this.user.password
        }
      })
      .then(data =>{
        this.$emit('isProfile',false)
      })
      .catch(err =>{
        this.isError.status = true;
        this.isError.msg = err.response.data.msg
      })
    }
  }
};
</script>

<style>
</style>