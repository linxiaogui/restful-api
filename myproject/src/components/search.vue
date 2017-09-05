<template>
  <div>{{msg}}</div>
</template>

<script>
export default {
  name: 'search',
  data(){
      return {
          msg: 'Welcome to search'
      }
  }
}
</script>
<style scoped>
   div{
       width: 300px;
       height: 100px;
       margin:50px auto;
       border: 1px solid red;
       text-align: center;
       line-height: 100px;
       overflow: hidden;
   }  
</style>


