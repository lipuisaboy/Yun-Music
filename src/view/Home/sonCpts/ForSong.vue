<template>
  <div>
    <div class='list' :style="{backgroundImage:`url(${songs.creator.backgroundUrl})`}" 
        v-if="songs.creator">
    </div>
    <div v-for="(item,index) in songs.tracks" :key="index" class="info">
      <div class="number" :style="activeStyle(index)">{{index+1 | test}}</div>
      <div class="all-name">
        <div class="name">
          <span>{{item.name}}</span>
          <span v-if="item.alia[0]" class="more-name">({{item.alia[0]}})</span>
        </div>
        <div class="singer">
          <i class="sq"></i>
          <span v-if="item.ar[0]">{{item.ar[0].name}}</span>
            -
          <span v-if="item.al">{{item.al.name}}</span>
        </div>
      </div>
      <i class="iconfont icon-bofang start" @click="startClick(item.id)"></i>
    </div>
  </div>
</template>

<script>
import {getNumber} from '../../../request/number'
export default {
  data(){
    return{
      songs:{}
    }
  },
  filters:{
    test:function(num){
      if(num < 10) return '0' + num
      return num
    }
  },
  created(){
    this._getNumber(1)
    // this.onunload()
    // if(this.$router.path !== '/home/foyou'){
    //       this.$router.replace('/home/foryou')
    //    }
  },
  methods:{
    _getNumber(id){
      getNumber(id).then(res => {
        this.songs = res.playlist
      })
    },
    activeStyle(index){
      if(index < 3){
        return {'color':'#DF3436'}
      }
    },
    startClick(id){
      this.$router.push(`/findSong/${id}`)
    },
    // onunload(){
    //   window.addEventListener('onunload',()=>{
    //     if(this.$router.path !== '/home/foyou'){
    //       this.$router.replace('/home/foryou')
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
  .list{
    height: 140px;
    width: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.8
  }
  .info{
    display: flex;
    width: 100%;
  }
  .info .number{
    width: 40px;
    text-align: center;
    padding: 0 10px;
    line-height: 55px;
    font-size: 17px;
    color: #888;
}
  .info .all-name{
    width:278px;
    height: 55px;
    padding:6px 0;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space: nowrap; 
    flex:1;
  }
  .info .name{
    font-size: 17px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .info .name .more-name{
    color: #888;
  }
  .info .singer .sq{
    background: url('../../../assets/img/index_icon_2x.png') no-repeat;
    background-size: 166px 97px;
    padding: 0 10px;
    position: relative;
    top: 4px;
    left:2px;
  }
  .info .singer{
    font-size: 12;
    color:#888;
  }
  .info .start{
    line-height: 54px;
    text-align: center;
    font-size: 25px;
    color: #888;
    padding: 0 10px;
  }
</style>