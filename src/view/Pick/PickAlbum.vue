<template>
  <div>
    <div class="top">
      <div class="bg" :style="{backgroundImage:`url(${al.album.blurPicUrl})`}"></div>
      <div class="bgc"></div>
      <div class="content">
        <div class="left">
          <img :src="al.album.blurPicUrl" alt="">
          <span class="icon">专辑</span>
        </div>
        <div class="right">
          <h2>{{al.album.name}}</h2>
          <div class="name">
            歌手: 
            <span>{{al.album.artists[0].name}}</span>
          </div>
          <div class="date">
            发行时间: {{al.album.publishTime | format}}
          </div>
        </div>
      </div>
    </div>
    <div class="brief">
      <div class="init" v-if="!isShow">
        简介:<br/>
        {{al.album.description}}
      </div>
      <div class="init-2" v-else>
        简介:<br/>
        {{al.album.description}}
      </div>
      <div class="bottom">
        <span class="click" v-if="!isShow" @click="open()">点击展开</span>
        <span class="click" v-if="isShow" @click="open()">点击收起</span>
      </div>
    </div>
    <div class="footer">
      <div class="song-title">歌曲列表</div>
      <div v-for="(item,index) in al.songs" :key="index" class="list" @click="toPlay(item.id)">
        <div class="index">{{index + 1}}</div>
        <div class="info">
          <div class="song-name">{{item.name}}</div>
          <div class="singer-name">
            <span>{{item.ar[0].name}}</span>
            <span>{{item.al.name}}</span>
          </div>
        </div>
        <i class="iconfont icon-bofang start"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {getAlbum} from '../../request/album'
import dayjs from 'dayjs'

export default {
  data(){
    return{
      id:null,
      al:{},
      isShow:false
    }
  },
  filters:{
    format:function(str){
      return dayjs(str).format('YYYY-MM-DD')
    }
  },
  created(){
    this.id = this.$route.params.id
    this._getAlbum(this.id)
  },
  methods:{
    _getAlbum(id){
      getAlbum(id).then(res => {
        window.console.log(res.songs)
        this.al = res
      })
    },
    open(){
      this.isShow = !this.isShow
      window.console.log(this.isShow)
    },
    toPlay(id){
      this.$router.push(`/findSong/${id}`)
    }
  }
}
</script>

<style scoped>
  .top{
    width: 100%;
    height: 186px;
    position: relative;
  }
  .top .bgc{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
  }
  .top .bg{
    width: 100%;
    height: 186px;
    background-position: bottom center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(22px);
    z-index: -1;
  }
  .top .content{
    width: 350px;
    height: 126px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -175px;
    margin-top: -63px;
    display: flex;
  }
  .top .content img{
    height: 126px;
    width: 126px;
  }
  .content .right{
    margin-left: 26px;
  }
  .left .icon{
    color: #fff;
    text-align: center;
    font-size: 12px;
    position: absolute;
    top: 10px;
    left: 0;
    display: inline-block;
    background-color: rgba(217,48,48,.8);
    width: 32px;
    border-top-right-radius:17px;
    border-bottom-right-radius: 17px;
  }
  .content .left::after{
    position: absolute;
    top: -42px;
    width: 18px;
    height: 250px;
    content: '';
    background: url('../../assets/img/index_icon_2x.png');
    background-repeat: no-repeat;
    background-size:300px 250px;
    background-position: 0 -30px;
  }
  .content h2{
    padding-top: 10px;
    font-weight: normal;
    margin:0;
    color: #fff;
    font-size: 17px;
  }
  .name{
    margin-top: 22px;
    color: rgba(255, 255, 255, .5);
    font-size: 14px;
  }
  .name span{
    color: #fff;
  }
  .date{
    margin-top: 5px;
     color: rgba(255, 255, 255, .5);
     font-size: 12px;
  }
  .brief{
    width: 100%;
    height: 100px;
    color: #666;
    font-size: 14px;
    padding: 10px 10px 0 15px;
  }
  .brief .init{
    height: 65px;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: wrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .bottom .click{
    font-size: 12px;
    margin-left: 85%;
  }
  .brief .active{
    height: auto;
  }
  .song-title{
    font-size: 12px;
    color: #666;
    height: 23px;
    width: 100%;
    background-color: #EEEFF0;
    padding: 0 10px;
    line-height: 23px;
  }
  .list{
    display: flex;
    width: 100%;
    height: 55px;
  }
  .list .index{
    width: 40px;
    text-align: center;
    font-size: 17px;
    line-height: 55px;
    color: #888;
  }
  .list .info{
    height: 55px;
    width: 278px;
    padding: 6px 0;
  }
  .list .info .song-name{
    font-size: 17px;
    color: #333;
  }
  .list .info .singer-name{
    color: #888;
    font-size: 12px;
  }
  .list .start{
    font-size: 23px;
    color: #888;
    text-align: center;
    line-height: 40px;
  }
</style>