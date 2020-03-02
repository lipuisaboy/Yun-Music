<template>
  <div class="list">
    <div class="song-list">
      <span>推荐歌单</span>
    </div>
    <div class="around">
      <div v-for="(item,index) in list" :key="index" class="play-list">
        <img :src="item.picUrl" alt="">
        <p class="text">{{item.name}}</p>
        <div class="info">
          <span class="math">
            <i class="iconfont icon-iconfonterji ear"></i>
            {{item.playCount | getMath}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getList} from '../../../request/list'
export default {
  data(){
    return{
      list:[]
    }
  },
  filters:{
    getMath:function(num){
      if(num<10000) return num
      return (num/10000).toFixed(1)+'万'
    }
  },
  created(){
    this._getSongList()
  },
  methods:{
    _getSongList(){
      getList().then(res => {
        this.list = res.result
      })
    }
  }
}
</script>

<style scoped>
.list .around{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
  .list .play-list{
    height: auto;
    width: 33%;
    position: relative;
    margin-bottom: 10px;
  }
  .list .info{
    top: 0;
    left:0;
    position: absolute;
    height: 15px;
    width: 100%;
    background: linear-gradient(180deg,rgba(0,0,0,.2),rgba(0,0,0,0));
  }
  .list .info .ear{
    color: #fff;
    font-size: 14px;
  }
  .list .info .math{
    position: absolute;
    right: 3px;
    top: 0;
    font-size: 12px;
    color: #fff;
  }
  .list .play-list img{
    height: 75%;
    width: 100%;
  }
  .list .song-list{
    height: 40px;
    padding: 20px 0 0 0;
    margin-bottom: 15px;
    font-size: 17px;
  }
  .list .song-list span{
    border-left: 2px solid #D43C33;
    padding-left:9px;
    color: #333;
  }
  .list .text{
    width: 123px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding: 0 0 0 10px;
    margin: 0;
    line-height: 15px;
    font-size: 13px;
  }
</style>