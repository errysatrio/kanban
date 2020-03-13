<template>
  <div class="add-page">
    <h2>Add</h2>
    <div class="form-container">
      <div class="container">
        <form @submit.prevent="addTask" id="form">
          <div id="title-add-form">
            <div>
              <label for="title">Title</label>
            </div>
            <div>
              <input type="text" name="title" id="title-login" v-model="task.title" />
            </div>
          </div>
          <div id="description-add-form">
            <div>
              <label for="description">Description</label>
            </div>
            <div>
              <input
                type="text"
                name="description"
                id="description-login"
                v-model="task.description"
              />
            </div>
          </div>
          <div class="my-btn">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
      <button @click.prevent="cancel" class="cancel">cancel</button>
    </div>
    <Alert v-if="isError.status" :isError="isError" ></Alert>
  </div>
</template>

<script>
import axios from "axios";
import Alert from '../components/alert'

export default {
  name: "Add",
  components: {
    Alert,
  },
  data() {
    return {
      task: {
        title: "",
        description: ""
      },
      isAdd: false,
      isError:{
        status:false,
        msg:[]
      }
    };
  },
  methods: {
    addTask() {
      console.log(this.task);
      // console.log(localStorage.access_token);
      axios({
        url: `http://localhost:3000/tasks`,
        method: "post",
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.task.title,
          description: this.task.description
        }
      })
        .then(data => {
          // console.log(data);
          this.$emit("added", false);
        })
        .catch(err => {
          // console.log(err);
          this.isError.msg = err.response.data.msg.join(' and ');
          this.isError.status = true;
        });
    },
    cancel() {
      // this.isAdd = false
      this.$emit("added", false);
    }
  }
};
</script>

<style>
</style>
