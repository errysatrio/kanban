<template>
  <div class="edit-page">
    <h2>Edit</h2>
    <div class="form-container">
      <div class="container">
        <form @submit.prevent="editData(task.id)" id="form">
          <div id="title-edit-form">
            <div>
              <label for="title">Title</label>
            </div>
            <div>
              <input type="text" name="title" id="title-login" v-model="task.title" />
            </div>
          </div>
          <div id="description-edit-form">
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
      <button @click="cancel">cancel</button>
    </div>
    <Alert v-if="isError.status" :isError="isError"></Alert>
  </div>
</template>
        
<script>
import axios from "axios";
import Alert from "../components/alert";
// const url = "http://localhost:3000";
const url = 'https://kanban-serve.herokuapp.com'

export default {
  name: "Edit",
  components: {
    Alert
  },
  props: ["task"],
  data() {
    return {
      isError: {
        status: false,
        msg: []
      }
    };
  },
  methods: {
    editData(id) {
      axios({
        url: `${url}/tasks/${id}`,
        method: "put",
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.task.title,
          description: this.task.description,
          category: this.task.category
        }
      })
        .then(data => {
          this.$emit("editted", false);
        })
        .catch(err => {
          this.isError.status = true;
          this.isError.msg = err.response.data.msg.join(` and `);
        });
    },
    cancel(){
      this.$emit('editted',false)
    },
  }
};
</script>
        
<style>
</style>