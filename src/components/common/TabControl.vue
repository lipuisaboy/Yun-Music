<template>
  <div class="control">
    <div v-for="(item,index) in title" :key="index" @click='tabClick(index)'>
      <span :class="{active: currentIndex === index}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      title:['推荐音乐','热歌榜','搜索'],
      currentIndex:0
    }
  },
  methods:{
    tabClick(index){
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
 .control{
   background: #fff;
   display: flex;
   justify-content: space-around;
   height: 40px;
   line-height: 40px;
   font-size: 15px;
   border-bottom: 1px solid #eaeaea;
 }
 .control .active{
   border-bottom: 2px solid #D43C33;
   color: #D43C33;
   padding-bottom: 7px;
 }
</style>