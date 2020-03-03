<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
  *{
    box-sizing: border-box;
  }
  html,body{
    margin: 0;
    padding: 0;
    font: 14px/1.5 Helvetica,sans-serif,STHeiTi;
  }
</style>
