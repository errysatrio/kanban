<template>
  <div> 
    <div v-for="todo in tasks" :key="todo.id" class="task">
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
</template>

<script>
export default {
    name: 'Card',
    data () {
        return {
        }
    },
    props: ['tasks']
}
</script>

<style>

</style>