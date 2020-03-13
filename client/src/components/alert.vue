<template>
  <div class="alert">
    <h3>{{isError.msg}}</h3>
  </div>
</template>
        
<script>
    export default {
        name:'Alert',
        props: ['isError'],
    };
</script>
        
<style>
</style>