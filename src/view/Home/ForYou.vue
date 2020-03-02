<template>
  <div>
    <song-list/>
    <sone/>
  </div>
</template>

<script>
const Sone = () => import('./sonCpts/Sone')
const SongList =() => import('./sonCpts/SongList')

export default {
  components:{
    Sone,
    SongList
  }
}
</script>

<style scoped>

</style>