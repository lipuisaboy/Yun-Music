<template>
  <div>
    <div class="top">
      <img :src="info.picUrl" alt="">
      <div class="singer-info">
        <p class="really">{{info.name}}</p>
        <p class="num">{{info}}</p>
        <p class="name"></p>
        <p class="follow">
          <span></span>
          <span> | </span>
          <span></span>
        </p>
        <p class="ider"></p>
      </div>
    </div>
  </div>
</template>

<script>
import {getSinger} from '../../request/singer'

export default {
  data(){
    return{
      id:null,
      info:{}
    }
  },
  created(){
    this.id = this.$route.params.id
    this._getSinger(this.id)
  },
  methods:{
    _getSinger(id){
      getSinger(id).then(res => {
        window.console.log(res.artist)
        this.info = res.artist
      })
    }
  }
}
</script>

<style scoped>
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
</style>