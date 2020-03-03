<template>
  <div>
    <div class="top" @click="toPlay()">
      <img :src="mvs.cover" alt="" v-if="!isShow">
      <video id="vd" :src="mvs.brs[number]"  preload width="100%" height="211" v-if="isShow"></video>
      <i class="iconfont icon-bofang start" v-if="!isStart"></i>
    </div>
    <div class="click">
      <ul v-if="isChose">
        <li @click="toChoose(240)">240</li>
        <li @click="toChoose(480)">480</li>
        <li @click="toChoose(1080)">1080</li>
      </ul>
      <div class="chose" @click="chose()">画质</div>
    </div>
    <div class="info">
      <p class="flex">
        <span class="icon">MV</span>
        <span class="name">{{mvs.name}}</span>
        <span class="more" @click="desc()">详情 &gt;</span>
      </p>
      <p class="singer">歌手: {{mvs.artistName}}</p>
      <p class="main">
        <span class="time">发布时间: {{mvs.publishTime}}</span>
        <span class="play">播放: {{mvs.playCount | format}}</span>
      </p>
    </div>
    <div class="dec" v-if="isDesc">
      {{mvs.desc}}
    </div>
    <div class="body">
      <div class="title">相关推荐</div>
    </div>
  </div>
</template>

<script>
import {getMv} from '../../request/mv'

export default {
  data(){
    return{
      id:null,
      mvs:{},
      isShow:false,
      isStart:false,
      isChose:false,
      number:240,
      isDesc:false
    }
  },
  filters:{
    format:function(num){
      if(num < 10000) return num;
      return (num/10000).toFixed(1) + '万'
    }
  },
  created(){
    this.id = this.$route.params.id
    this._getMv(this.id)
  },
  methods:{
    _getMv(id){
      getMv(id).then(res => {
        window.console.log(res.data)
        this.mvs = res.data
      })
    },
    toPlay(){
      this.isStart = !this.isStart
      this.isShow = true
      var Video = document.getElementById('vd')
      if(this.isStart){
        Video.play()
      }else{
        Video.pause()
      }
    },
    chose(){
      this.isChose = !this.isChose
    },
    toChoose(num){
      this.number = num
      window.console.log(this.number)
    },
    desc(){
      this.isDesc = !this.isDesc
    }
  }
}
</script>

<style scoped>
  .top{
    width: 100%;
    height: 211px;
    position: relative;
  }
  .top img{
    width: 100%;
    height: 211px;
    z-index: -1;
  }
  .top .start{
    font-size: 50px;
    color: #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -25px;
    margin-top: -37px;
  }
  ul{
    font-size: 12px;
    list-style: none;
    padding: 0;
    width: 40px;
    position: fixed;
    text-align-last: center;
    right: 5px;
    top: 110px;
  }
  ul li{
    width: 40px;
  }
  .click{
    color: #fff;
    position: fixed;
    right: 10px;
    top: 180px;
  }
  .chose{
    font-size: 12px;
    text-align: center;
    line-height: 18px;
    height: 18px;
    width: 30px;
    border: 1px solid #fff;
  }
  .info{
    height: 130px;
    width: 100%;
    padding: 15px 10px 0;
    position: relative;
  }
  .info .icon{
    display: inline-block;
    position: relative;
    top: -2px;
    width: 24px;
    text-align: center;
    color: #D33A31;
    border: 1px solid #D33A31;
    font-size: 10px;
  }
  .info .name{
    margin-left: 10px;
    color: #333;
    font-size: 17px;
  }
  .info .more{
    position: absolute;
    font-size: 12px;
    top: 31px;
    right: 10px;
  }
  .info .singer{
    font-size: 13px;
    color: #507DAf;
  }
  .info .time{
    font-size: 13px;
    color: #999;
  }
  .info .play{
    font-size: 13px;
    color: #999;
    margin-left: 35px;
  }
  .dec{
    padding: 0 10px;
    color: #666;
    font-size: 13px;
  }
  .title{
    margin-top: 12px;
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    padding-left: 10px;
    background-color: rgba(0,0,0,0.05);
    color: #666;
  }
</style>