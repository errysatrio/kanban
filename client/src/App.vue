<template>
  <div>
    <Navbar v-if="isLogin" @isLogin="showLoginForm" @isProfile="showEditProfile" ></Navbar>
    <Alert v-if="isError.status" ></Alert>
    <Login v-if="!isLogin && !isRegister" @isLogin="showLoginForm" @isRegister="showRegisterForm" ></Login>
    <EditProfile v-else-if="isProfile" @isProfile="afterProfile"></EditProfile>
    <Register v-if="isRegister" @isRegister="showLoginForm"></Register>
    <Main v-if="!isProfile && isLogin && !isEdit && !isAdd" @isAdd="showAddForm"></Main>
    <footer>
      <p>ini seharusnya adalah footer</p>
    </footer>
  </div>
</template>

<script>
import Navbar from "../src/components/navbar";
import Alert from "../src/components/alert";
import Login from "../src/components/login";
import Register from "../src/components/register";
import Main from "../src/components/main";
import EditProfile from '../src/components/editProfile'

const url = 'https://kanban-serve.herokuapp.com'

export default {
  name: "App",
  components: {
    Navbar,
    Alert,
    Login,
    Register,
    EditProfile,
    Main
  },
  data() {
    return {
      isProfile:false,
        isRegister: false,
        isEdit: false,
        isAdd: false,
        isLogin: localStorage.access_token,
        isError: {
          status: false,
          msg: []
        },
        task: {},
        tasks: []
    }
  },
  methods: {
    afterProfile(){
      this.login = true
      this.isProfile = false
    },
    showEdit(id) {
      axios({
        url: `${this.url}/${id}`,
        method: "get",
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          this.isEdit = true;
          this.todo = data;
        })
        .catch(err => {
          showAlert();
          this.isError.msg = err.msg.join("\n");
        });
    },
    showEditProfile(){
      this.isProfile = true
      this.isRegister = false;
      this.isLogin = true;
      this.isEdit = false;
      this.isAdd = false;
    },
    showAddForm() {
      this.isRegister = false;
      this.isLogin = false;
      this.isEdit = false;
      this.isAdd = true;
    },
    showRegisterForm() {
      this.isRegister = true;
      this.isLogin = false;
      this.isEdit = false;
      this.isAdd = false;
    },
    showLoginForm() {
      if (localStorage.access_token) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
        this.isRegister = false
      }
    },
    showAlert() {
      this.isError.status = true;
    }
  },
  watch: {
      isLogin(){
          if (localStorage.access_token) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
        this.isRegister = false
      }
      }
  },
  created(){
      if(this.isLogin){
          this.showLoginForm()
      } else {
          this.isLogin = false
      }
  },
  
};
</script>

<style>
</style>

