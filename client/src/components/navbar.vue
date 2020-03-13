<template>
  <div class="navbar">
    <a href="#">
      <div class="nav-opt" @click.prevent="showEditProfile()">Edit Profile</div>
    </a>
    <a href="#">
      <div class="nav-opt" @click.prevent="backHome" id="mid-text-navbar" >It's Kanban Card</div>
    </a>
    <div class="signout">
      <a @click.prevent="signout()" href="#">signout</a>
    </div>
  </div>
</template>
        
<script>
    export default {
        name:'navbar',
        data(){
          return {
            user:{
              email:'',
              password:''
            },
            isProfile:false
          }
        },
        methods: {
          signout() {
            localStorage.removeItem('access_token')
            this.$emit('isLogin',localStorage.access_token)
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
            console.log('User signed out.');
            });
          },
          showEditProfile(id){
            this.$emit('isProfile', true)
          },
          backHome(){
            this.$emit('isLogin', true)
          }
        }
    };
</script>
        
<style>
@import url('https://fonts.googleapis.com/css?family=Pacifico&display=swap');
#mid-text-navbar{
  font-family: 'Pacifico', cursive;
}
</style>