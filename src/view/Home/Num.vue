<template>
  <div>
    <for-song/>
  </div>
</template>

<script>
const ForSong = () => import('./sonCpts/ForSong')
export default {
  components:{
    ForSong
  }
}
</script>

<style scoped>

</style>