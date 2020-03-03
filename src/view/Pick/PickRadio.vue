<template>
  <div>
    <div class="bg">
      <div class="bgc"></div>
      <img :src="radios.picUrl" alt="">
      <div class="info">
        <div class="name">
          <div class="r-name">{{radios.name}}</div>
          <div class="fans">{{radios.subCount}}人已订阅</div>
        </div>
        <div class="sub">
          <span> + 订阅</span>
        </div>
      </div>
    </div>
    <div class="title">
      <div @click="hover()">
        <span :class="{'active': isHover}">详情</span>
      </div>
      <div @click="hover1()">
        <span :class="{'active': isHover1}">节目{{radios.programCount}}</span>
      </div>
    </div>
    <div class="meau">
      <div class="num" v-if="isHover1">共{{radios.programCount}}期</div>
    </div>
    <div class="more" v-if="isHover">
      <div class="zhubo">主播</div>
      <div class="top">
        <div class="top-bg">
          <img :src="radios.dj.avatarUrl" alt="">
        </div>
        <div class="top-name">
          <div class="ar">{{radios.dj.nickname}}</div>
          <div class="al">{{radios.dj.signature}}</div>
        </div>
      </div>
      <div class="zhubo">电台内容简介</div>
      <div class="desc">
        {{radios.desc}}
      </div>
    </div>
  </div>
</template>

<script>
import {getRadio} from '../../request/radio'

export default {
  data(){
    return{
      id:null,
      radios:{},
      isHover:true,
      isHover1:false
    }
  },
  created(){
    this.id = this.$route.params.id
    this._getRadio(this.id)
  },
  methods:{
    _getRadio(id){
      getRadio(id).then(res => {
        this.radios = res.djRadio
      })
    },
    hover(){
      this.isHover = true;
      this.isHover1 = false;
    },
    hover1(){
      this.isHover1 = true;
      this.isHover = false;
    }
  }
}
</script>

<style scoped>
  .bg{
    height: 281px;
    width:100%;
    position: relative;
  }
  .bg img{
    height: 281px;
    width:100%;
  }
  .bgc{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height:281px;
    background-color: rgba(0,0,0,.2);
  }
  .info{
    display: flex;
    width:100%;
    position: absolute;
    bottom: 15px;
    left:12px;
  }
  .info .name{
    width: 250px;
    height: 50px;
  }
  .name .r-name{
    font-size: 18px;
    color: #fff;
  }
  .name .fans{
    color: rgba(0, 0, 0, .8);
    font-size: 13px;
  }
  .sub{
    margin-top: 10px;
    margin-left: 20px;
    height: 30px;
    width: 80px;
    font-size: 12px;
    border: 1px solid #fff;
    border-radius: 50px;
    color: #fff;
    text-align:center;
    line-height: 30px;
  }
  .title{
    line-height: 40px;
    font-size: 13px;
    color: #999;
    height:40px;
    width:100%;
    display: flex;
    justify-content: space-around;
  }
  .title .active{
    padding-bottom: 5px;
    border-bottom:3px solid #DD001B;
  }
  .num{
    height: 30px;
    font-size: 12px;
    color: #666;
    line-height: 30px;
    background-color: rgba(0,0,0,.05);
    padding-left: 10px;
  }
  .zhubo{
    margin-top: 20px;
    height: 20px;
    font-size: 14px;
    border-left: 3px solid #D33A31;
    padding-left: 10px;
    line-height: 20px;
  }
  .top-bg img{
    height: 70px;
    width: 70px;
    border-radius: 100%;
    padding: 10px
  }
  .top{
    display: flex;
    height: 70px;
    padding: 10px;
  }
  .top-name{
    height: 70px;
    width: 280px;
    padding: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .top-name .ar{
    color: #333;
    font-size: 16px;
  }
  .top-name .al{
    color: #999;
    font-size: 14px;
  }
  .desc{
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: #666;
  }
  </style>