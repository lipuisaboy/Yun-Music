<template>
  <div>
    <div class="top">
      <top/>
      <tab-control @tabClick="tabClick"/>
    </div>
    <div class="body">
      <for-you v-if="currentIndex === 0"/>
      <num v-if="currentIndex === 1"/>
      <search v-if="currentIndex === 2"/>
    </div>
  </div>
</template>

<script>
const Top = () => import('./sonCpts/Top')
const TabControl = () => import('../../components/common/TabControl')
const ForYou = ()=> import('./ForYou')
const Num =() => import('./Num')
const Search =() => import('./Search')

export default { 
  components:{
    Top,
    TabControl,
    ForYou,
    Num,
    Search
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    tabClick(index){
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
 .top{
   width: 100%;
   position: fixed;
   top:0;
   left: 0;
   z-index: 100;
 }
 .body{
   position: absolute;
   top: 124px;
 }
</style>