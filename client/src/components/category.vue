<template>
  <div class="category">
    <div class="card">
      <h3>{{category.name}}</h3>
      <div class="category-separator">
        <Card :tasks="tasks"/>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../components/card'
export default {
    name: 'Category',
    components: {
        Card
    },
    props: ['tasks', 'category']
}
</script>

<style>

</style>