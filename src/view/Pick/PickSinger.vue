<template>
  <div>
    <div class="top">
      <img :src="info.picUrl" alt="">
      <div class="singer-info">
        <p class="really">{{info.name}}</p>
        <p class="num" v-if="index">歌手榜华语地区 No.{{index}}</p>
        <p class="name">昵称: {{info.name}}</p>
        <p class="ider">入驻艺人</p>
      </div>
    </div>
    <h2>歌手简介</h2>
    <div class="dec">
      <p v-if="!isOpen" class="show">{{info.briefDesc}}</p>
      <p v-else>{{info.briefDesc}}</p>
      <div class="click" @click="open()">完整歌手介绍 &gt;</div>
    </div>
    <h2>热门单曲</h2>
    <div v-for="(item,index) in songs" :key="index" class="hot" @click="toPlay(item.id)">
      <div class="hot-index">{{index + 1}}</div>
      <div class="hot-all">
        <div class="hot-name">{{item.name}}</div>
        <div>
          <i class="bg" v-if="item.privilege.maxbr > 320000"></i>
          <span class="hot-ar">{{item.ar[0].name}}</span>
          <span class="hot-ar" v-if="item.ar[1]">{{item.ar[1].name}}</span>
          <span> - </span>
          <span class="hot-al">{{item.al.name}}</span>
        </div>
      </div>
      <i class="iconfont icon-bofang start"></i>
    </div>
  </div>
</template>

<script>
import {getSinger} from '../../request/singer'
import {getRank} from '../../request/rank'

export default {
  data(){
    return{
      id:null,
      info:{},
      rank:[],
      index:null,
      isOpen:false,
      songs:[]
    }
  },
  created(){
    this.id = this.$route.params.id
    this._getSinger(this.id)
    this._getRank()
  },
  methods:{
    _getSinger(id){
      getSinger(id).then(res => {
        // window.console.log(res.artist)
        this.info = res.artist
        this.songs = res.hotSongs.slice(0,5)
      })
    },
    _getRank(){
      getRank().then(res => {
        this.rank = res.list.artists
        for(let i = 0; i< this.rank.length; i++){
          if(this.rank[i].id == this.id){
            this.index = i + 1 
          }
        }
      })
    },
    open(){
      this.isOpen = !this.isOpen
    },
    toPlay(id){
      this.$router.push(`/findSong/${id}`)
    }
  }
}
</script>

<style scoped>
  .top{
    position: relative;
    height: 304px;
    width: 100%;
  }
  .top img{
    height: 304px;
    width: 100%;
  }
  .top::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 309px;
    background-color: rgba(0,0,0,0.2);
  }
  .top p{
    padding: 0;
    margin: 0;
  }
  .top .singer-info{
    color: #fff;
    position: absolute;
    left: 20px;
    bottom: 10px;
    z-index: 999;
    font-weight: 550;
  }
  .singer-info .really{
    font-size: 20px;
  }
  .singer-info .num{
    font-size: 13px;
    margin-top: 15px;
  }
  .singer-info .name{
    margin-top: 10px;
    color: #eeeeff;
    font-size: 12px;
  }
  .singer-info .ider{
    color: #eeeeff;
    font-size: 12px;
    margin-top: 8px;
  }
  h2{
    padding: 15px;
    margin: 0;
    color: #333;
  }
  .dec{
    width: 100%;
    color: #666;
    padding: 0 16px 18px;
     font-size: 14px;
  }
  .dec .show{
    margin: 0;
    width: 100%;
    height: 63px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .dec .click{
    margin-top: 20px;
    text-align: center;
  }
  .hot{
    width: 100%;
    height: 60px;
    display: flex;
  }
  .hot .hot-index{
    width:40px;
    text-align: center;
    line-height: 60px;
    font-size: 17px;
    color: #888;
  }
  .hot .hot-all{
    margin-left: 10px;
    width: 278px;
    padding: 6px 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space:nowrap;
  }
  .hot .hot-name{
    font-size: 17px;
  }
  .hot .bg{
    background: url('../../assets/img/index_icon_2x.png') no-repeat;
    background-size: 166px 97px;
    padding: 0 10px;
    position: relative;
    top: 3px;
    left: 1px;
  }
  .hot .hot-ar{
    font-size: 12px;
    color: #888;
  }
  .hot .hot-al{
    font-size: 12px;
    color: #888;
  }
  .hot .start{
    font-size: 23px;
    line-height: 60px;
    color:#888;
  }
</style>