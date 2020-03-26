<template>
  <div>
    <Add v-if="isAdd" @added="afterAdd"></Add>
    <Edit v-else-if="isEdit" :task="task" @editted="afteredit"></Edit>
    <Alert v-if="isError.status" @status="status"></Alert>
    <div v-else-if="!isAdd && !isEdit" class="main-page">
      <div class="title">
        <h1>Kanban Card</h1>
      </div>
      <div class="add-btn">
        <button @click="isAdd=!isAdd">Add Task</button>
      </div>
      <div class="category-container">
        <div class="container">
          <Category :category="categories[0]" :tasks="tasks.tasks1"/>
        </div>
        <div class="container">
          <Category :category="categories[1]" :tasks="tasks.tasks2"/>
        </div>
        <div class="container">
          <Category :category="categories[2]" :tasks="tasks.tasks3"/>
        </div>
        <div class="container">
          <Category :category="categories[3]" :tasks="tasks.tasks4"/>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import Add from "./add";
import Edit from "./edit";
import EditProfile from './editProfile';
import Alert from "./alert";
import Category from '../components/category'

const url = "http://localhost:3000";
// const url = 'https://kanban-serve.herokuapp.com'

export default {
  name: "Main",
  components: {
    Category,
    Add,
    Edit,
    Alert,
    EditProfile
  },
  data() {
    return {
      task: {
        id: 0,
        title: "",
        description: ""
        },
        categories: [{
          id: 0,
          name: 'Back Log'
        },
        {
          id: 1,
          name: 'To Do'
        },
        {
          id: 2,
          name: 'Doing'
        },
        {
          id: 3,
          name: 'Done'
        }],
      tasks: {
        tasks0: [],
        tasks1: [],
        tasks2: [],
        tasks3: []
      },
      isAdd: false,
      isEdit: false,
      isProfile:false,
      isError: {
        status: false,
        msg: ""
      }
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    afterprofile(payload){
      this.isProfile = payload
      this.getAll()
    },
    afterAdd(payload) {
      this.isAdd = payload;
      this.getAll();
    },
    afteredit(payload) {
      this.isEdit = payload;
      this.getAll();
    },
    getAll() {
      axios({
        url: `${url}/tasks`,
        method: "get",
        headers: {
          access_token: localStorage.access_token
        }
      }).then(data => {
        this.isAdd = false;
        this.tasks.tasks1 = data.data.filter(el => el.category === 0);
        this.tasks.tasks2 = data.data.filter(el => el.category === 1);
        this.tasks.tasks3 = data.data.filter(el => el.category === 2);
        this.tasks.tasks4 = data.data.filter(el => el.category === 3);
      })
      .catch(err => {
        this.isError.status = true
        this.isError.msg = err.response.data.msg
      })
    },
    showAdd() {
      this.$emit("isAdd", true);
    },
    getOne(id){
      console.log('ini get one')
      axios({
        url: `${url}/tasks/${id}`,
        method: "get",
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(data => {
          this.task.id = data.data.id;
          this.task.title = data.data.title;
          this.task.description = data.data.description;
          this.task.category = data.data.category;
        })
        .catch(err => {
          this.isError.status = true
          this.isError.msg = err.response.data.msg
        });
    },
    showEdit(id) {
      this.getOne(id)
      this.isEdit = true;
    },
    addCategory(obj) {
      // this.getOne(id)
      console.log(obj)
      axios({
        url: `${url}/tasks/${obj.id}`,
        method: "put",
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: obj.title,
          description: obj.description,
          category: obj.category + 1
        }
      })
        .then(data => {
          this.getAll()
        })
        .catch(err => {
          this.isError.status = true
          this.isError.msg = err.response.data.msg
        });
    },
    decreaseCategory(obj) {
      // this.getOne(id)
      console.log(obj)
      axios({
        url: `${url}/tasks/${obj.id}`,
        method: "put",
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: obj.title,
          description: obj.description,
          category: obj.category - 1
        }
      })
        .then(data => {
          this.getAll()
        })
        .catch(err => {
          this.isError.status = true
          this.isError.msg = err.response.data.msg
        });
    },
    deleteCategory(id){
      this.getOne(id)
        axios({
          url:`${url}/tasks/${id}`,
          method:'delete',
          headers:{
            access_token:localStorage.access_token
          }
        }).then(data =>{
          this.getAll()
        }).catch(err =>{
          this.isError.status = true
          this.isError.msg = err.response.data.msg.join(', ')
        })
      }
  }
};
</script>

<style>
.category-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
</style>
