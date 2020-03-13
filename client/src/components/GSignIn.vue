<template>
    <div>
        sign in with google here
        <button @click="googleLogin" >Sign In</button>
    </div>
</template>

<script>
import Axios from 'axios'
// const url = 'http://localhost:3000'
const url = 'https://kanban-serve.herokuapp.com'

export default {
data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        clientId: 'YOUR_APP_CLIENT_ID.apps.googleusercontent.com'
      }
    }
  },
  methods: {
      googleLogin(){
        this.$gAuth.signIn()
        .then(GoogleUser => {
            let google_token = GoogleUser.getAuthResponse()
            Axios({
                url:`${url}/user/GoogleLogin`,
                method:'post',
                data:{
                  token:google_token
                }
            }).then( data => {
                localStorage.setItem('access_token', data.data.access_token)
                this.$emit('isLogin',true)
            }).catch(err =>{
                console.log(err)
            })
            // console.log('user', google_token.access_token)
        // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
        // GoogleUser.getId() : Get the user's unique ID string.
        // GoogleUser.getBasicProfile() : Get the user's basic profile information.
        // googl
})
.catch(error  => {
  //on fail do something
})

      },
  }
}
</script>

<style>
.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>