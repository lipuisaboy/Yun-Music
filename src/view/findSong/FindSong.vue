<template>
  <div class="song-bg" @click="touchWeb()">
    <div class="bg" :style="{backgroundImage:`url(${songs.al.picUrl})`}" v-if="songs.al"></div>
    <div class="bg-blur"></div>
    <div class="content">
      <div class='title'>
        <img src="../../assets/img/wyy.png" alt="">
        <span>网易云音乐</span>
      </div>
      <div class="gun">
        <img src="../../assets/img/needle-ip6.png" alt="">
      </div>
      <div class="out">
        <div class="play">
          <img :src="songs.al.picUrl" alt="" id="start" 
                v-if="songs.al"> 
          <i class="iconfont icon-bofang start" v-if="isShow"></i>
        </div>
      </div>
      <div class="lc-info">
        <p v-if="songs.al">{{songs.al.name}}</p>
        <p v-if="songs.ar[0]" class="lc-name">
          <span>{{songs.ar[0].name}}</span>
          <span v-if="songs.ar[1]">- {{songs.ar[1].name}}</span>
        </p>
      </div>
      <div class="lyric" v-for="(item,index) in lc" :key="index">
        <p v-show="index === currentIndex">{{item.content}}</p>
      </div>
      <!-- <swiper class="lyric" v-if="lc.length" :options="swiperOption">
        <swiper-slide v-for="(item,index) in lc" :key="index">
          <p v-if="item.content">{{item.content}}</p>
        </swiper-slide>
      </swiper> -->
       <div class="footer">
        <a href="#" class="left">打开</a>
        <a href="#" class="right">下载</a>
      </div>
      <audio :src="play.url"  muted="false" @ended="end()" ref="audios" preload="load"></audio>
    </div>
  </div>
</template>

<script>
import {getUrl,getDetail} from '../../request/song'
import {getLyric} from '../../request/lyric'

export default {
  data(){
    return{
      // swiperOption:{
      //   direction:'vertical',
      //   centeredSlides:true
      // },
      songs:{},
      id:null,
      play:{},
      lc:[],
      isShow:true,
      isStart:false,
      deg:0,
      time:0,
      tiemr:null,
      tiemr2:null,
      number:0,
      nowTime:0,
      currentIndex:0
    }
  },
  beforCreated(){
    this.isShow = true
  },
  created(){
    this.id = this.$route.params.id
    this._getUrl(this.id)
    this._getDetail(this.id)
    this._getLyric(this.id)
    // this.webPlay()
    // this.timer()
    // setTimeout(() => {
    //   this.forIos()
    // })
  },
  destroyed(){
    window.console.log('离开了')
    this.back()
  },
  methods:{
    _getUrl(id){
      getUrl(id).then(res => {
        this.play = res.data[0]
      })
    },
    _getDetail(id){
      getDetail(id).then(res => {
        this.songs = res.songs[0]
      })
    },
    _getLyric(id){
      getLyric(id).then(res => {
        // window.console.log(res.split('\n'))
        let arr = res.split('\n')
        let arr2 = []
        for(let i = 0; i < arr.length; i++){
          arr[i] = arr[i].replace('[','minutes-')
          arr[i] = arr[i].replace(':','-seconds-')
          arr[i] = arr[i].replace('.','-Hseconds-')
          arr[i] = arr[i].replace(']','-content-')
          let obj = {}
          let num1 = arr[i].split('-')[1] * 60
          let num2 = arr[i].split('-')[3] * 1
          let num3 = arr[i].split('-')[5] * 0.001
          obj.time = Math.round((num1 + num2 + num3))
          obj.content = arr[i].split('-')[7]
          arr2.push(obj)
        }
        window.console.log(arr2)
        this.lc = arr2
      })
    },
    touchWeb(){
          this.isShow = !this.isShow
          this.isStart = !this.isStart
        if(this.isShow === false){
          this.$refs.audios.play()
          this.$refs.audios.muted = false
          window.console.log(this.$refs.audios.muted)
          window.console.log(this.$refs.audios.volume)
          this.timer()
          this.timer2()
          //  this.getTime()
          let oImg = document.getElementById('start')
          // this.toPlay()
          oImg.style.transform = `rotate(60000deg)`
          oImg.style.transition = 'all 6000s linear'
        }else if(this.isShow === true){
          clearInterval(this.tiemr)
          clearInterval(this.tiemr2)
          this.getIndex()
          let oImg = document.getElementById('start')
          this.$refs.audios.pause()
          oImg.style.transform = `rotate(${(360*this.number) + this.deg}deg)`;
        }
    },
      forIos(){
        document.addEventListener('touchstart',this.toPlay(),false)
        document.removeEventListener('touchstart',this.toPlay(),false)
      },
      toPlay(){
        var Audio = document.getElementsByTagName('audio')[0]
        Audio.load()
      },
      // document.addEventListener('touchstart',() => {
      //   this.$refs.audios.play()
      //     this.$refs.audios.pause()
      //   // var Audio = document.getElementsByTagName('audio')[0]
      //   if(this.play.url){
      //     this.isShow = !this.isShow
      //     this.isStart = !this.isStart
      //   if(this.isShow === false){
      //     this.$refs.audios.play()
      //     this.timer()
      //     this.timer2()
      //     //  this.getTime()
      //     let oImg = document.getElementById('start')
      //     // this.toPlay()
      //     oImg.style.transform = `rotate(60000deg)`
      //     oImg.style.transition = 'all 6000s linear'
      //   }else if(this.isShow === true){
      //     clearInterval(this.tiemr)
      //     clearInterval(this.tiemr2)
      //     this.getIndex()
      //     let oImg = document.getElementById('start')
      //     this.$refs.audios.pause()
      //     oImg.style.transform = `rotate(${(360*this.number) + this.deg}deg)`;
      //   }
      //   }
      // },false),
    getIndex(){
      var Audio = document.getElementsByTagName('audio')[0]
      this.lc.find((item,index) => {
        if(item.time === Math.round(Audio.currentTime)){
          this.nowTime = index
        }
        if(this.nowTime !== this.currentIndex){
          this.currentIndex = this.nowTime
        }
      })
    },
    /*
      控制轮盘进度
    */ 
    timer(){
      this.tiemr = setInterval(()=>{
        this.time ++;
        this.deg = this.deg +10
        if(this.deg === 360){
          this.number++
          this.deg = 0;
        }
    },1000)
    },
    /*
      控制歌曲歌词显示 
    */
    timer2(){
      this.tiemr2 = setInterval(() => {
      this.getIndex()
    },1000)
    },
    end(){
      window.console.log('结束了')
      this.isShow = !this.isShow;
      clearInterval(this.tiemr)
      clearInterval(this.tiemr2)
      let oImg = document.getElementById('start')
      oImg.style.transform = `rotate(${(360*this.number) + this.deg}deg)`;
    },
    back(){
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
  .song-bg{
    height: 100vh;
    width: 100%;
    position: relative;
  }
  .song-bg .bg-blur{
    position: absolute;
    top: 0;
    height: 100%;
    width:100%;
    background: rgba(0,0,0,.6);
  }
  .song-bg .content{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 50%;
    margin-left: -50%;
  }
  .song-bg .bg{
    height: 100%;
    z-index: -1;
    background-size: cover;
    background-position: center center;
    filter:blur(20px);
  }
  .title{
    height: 17px;
    width: 100px;
    color: #fff;
    position:relative;
    top: 10px;
    margin-left: 10px;
    line-height: 17px;
  }
  .title img{
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    margin-top:-8px;
  }
  .title span{
    margin-left: 20px;
  }
  .out{
    height: 300px;
    width: 300px;
    border-radius: 50%;
    background-color: rgba(255,255,255,0.1);
    margin: 50px auto;
    position: relative;
  }
  .play{
    height: 270px;
    width: 270px;
    border-radius: 50%;
    background: #090909;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -135px;
    margin-left: -135px;
  }
  .play img{
    height: 190px;
    width: 190px;
    border-radius: 50%;
    position: absolute;
    top:50%;
    left: 50%;
    margin-top: -95px;
    margin-left: -95px;
  }
  .play .start{
    font-size: 50px;
    color: rgb(220, 220, 220);
    position: relative;
    left: 115px;
    top: 100px;
    background-color: rgba(1,1,1,0.5);
    border-radius: 50%;
  }
  .lyric p{
    position: absolute;
    top: 480px;
    width: 100%;
    color: rgba(255,192,203,.9);
    text-align: center;
    font-size: 18px;
  }
  .lc-info{
    color: #fff;
    font-size: 17px;
    text-align: center;
    width: 100%;
    position: absolute;
    top: 400px;
  }
  .lc-info .lc-name{
    font-size: 13px;
  }
  .footer{
    position:absolute;
    width:100%;
    height:50px;
    bottom: 0;
  }
  .footer a{
    text-align: center;
    display: inline-block;
    height: 40px;
    width: 162px;
    text-decoration: none;
    line-height:40px;
    font-size: 18px;
    margin-left: 18px;
  }
  .footer .left{
    color: #FF3A3A;
    border-radius: 40px;
    border: 1px solid #FF3A3A;
    background: rgba(0,0,0,0.1);
  }
  .footer .right{
    border-radius:40px;
    background-color: #FF3A3A;
    color: #fff;
  }
  .gun{
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -10px;
    z-index: 2;
  }
  .gun img{
    width: 96px;
    height: 137px;
  }
</style>