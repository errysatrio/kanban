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
      <div class="container">
        <div class="category">
          <div class="card">
            <h3>Back Log</h3>
            <div class="category-separator">
              <div v-for="todo in tasks1" :key="todo.id" class="task">
                <a v-if="todo.category === 0  ? false : true" @click.prevent="decreaseCategory(todo)" href="#">
                  <i class="fas fa-backward"></i>
                </a>
                <a @click.prevent="showEdit(todo.id)" @editted="afteredit" href>
                      {{ todo.title }}
                </a>
                <a v-if="todo.category === 3 ? false : true" @click.prevent="addCategory(todo)" href="#">
                  <i class="fas fa-forward"></i>
                </a>
                <a v-if="todo.category !== 3 ? false : true" @click.prevent="deleteCategory(todo.id)" href="#">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="category">
          <div class="card">
            <h3>To Do</h3>
            <div v-for="todo in tasks2" :key="todo.id" class="task">
                <a v-if="todo.category === 0  ? false : true" @click.prevent="decreaseCategory(todo)" href="#">
                  <i class="fas fa-backward"></i>
                </a>
                <a @click.prevent="showEdit(todo.id)" @editted="afteredit" href>
                  {{ todo.title }}
                </a>
                <a v-if="todo.category === 3 ? false : true" @click.prevent="addCategory(todo)" href="#">
                  <i class="fas fa-forward"></i>
                </a>
                <a v-if="todo.category !== 3 ? false : true" @click.prevent="deleteCategory(todo.id)" href="#">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </div>
          </div>
        </div>
        <div class="category">
          <div class="card">
            <h3>Doing</h3>
              <div v-for="todo in tasks3" :key="todo.id" class="task">
                <a v-if="todo.category === 0  ? false : true" @click.prevent="decreaseCategory(todo)" href="#">
                  <i class="fas fa-backward"></i>
                </a>
                <a @click.prevent="showEdit(todo.id)" @editted="afteredit" href>
                      {{ todo.title }}
                </a>
                <a v-if="todo.category === 3 ? false : true" @click.prevent="addCategory(todo)" href="#">
                  <i class="fas fa-forward"></i>
                </a>
                <a v-if="todo.category !== 3 ? false : true" @click.prevent="deleteCategory(todo.id)" href="#">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </div>
          </div>
        </div>
        <div class="category">
          <div class="card">
            <h3>Done</h3>
            <div v-for="todo in tasks4" :key="todo.id" class="task">
                <a v-if="todo.category === 0  ? false : true" @click.prevent="decreaseCategory(todo)" href="#">
                  <i class="fas fa-backward"></i>
                </a>
                <a @click.prevent="showEdit(todo.id)" @editted="afteredit" href>
                      {{ todo.title }}
                </a>
                <a v-if="todo.category === 3 ? false : true" @click.prevent="addCategory(todo)" href="#">
                  <i class="fas fa-forward"></i>
                </a>
                <a v-if="todo.category !== 3 ? false : true" @click.prevent="deleteCategory(todo.id)" href="#">
                  <i class="fas fa-trash-alt"></i>
                </a>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Add from "./add";
import Edit from "./edit";
import Alert from "./alert";

const url = "http://localhost:3000";
export default {
  name: "Main",
  components: {
    Add,
    Edit,
    Alert
  },
  data() {
    return {
      task: {
        id: 0,
        title: "",
        description: "",
        category: 0
      },
      tasks1: [],
      tasks2: [],
      tasks3: [],
      tasks4: [],
      isAdd: false,
      isEdit: false,
      isError: {
        status: false,
        msg: ""
      }
    };
  },
  created() {
    this.getAll();
    // axios({
    //     url: `${url}/tasks`,
    //     method: "get",
    //     headers: {
    //       access_token: localStorage.access_token
    //     }
    //   }).then(data => {
    //     console.log(data)
    //     data.data.filter(el=> el.category===0)
    //     this.tasks1 = data.data
    //   });
  },
  methods: {
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
        console.log(data.data);
        this.isAdd = false;
        this.tasks1 = data.data.filter(el => el.category === 0);
        this.tasks2 = data.data.filter(el => el.category === 1);
        this.tasks3 = data.data.filter(el => el.category === 2);
        this.tasks4 = data.data.filter(el => el.category === 3);
      });
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
          console.log(err);
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
          console.log(err);
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
          console.log(err);
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
          console.log(err)
        })
      }
  }
};
</script>

<style>
</style>
