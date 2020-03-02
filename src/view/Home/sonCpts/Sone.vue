<template>
  <div>
    <div class='title'>
      <span>最新音乐</span>
    </div>
    <div class="song">
      <div class="song-name" v-for="(item,index) in songs" :key="index">
        <div class="info">
          <span class="name">{{item.name}}</span>
          <span class="from" v-if="item.song.alias[0]">({{item.song.alias[0]}})</span>
          <div class="more">
            <i class="bg" v-if="item.song.privilege.maxbr>320000"></i>
            <span class="left" v-if="item.song">{{item.song.artists[0].name}}</span>
              -
            <span class="right" v-if="item.song">{{item.song.album.name}}</span>
          </div>
        </div>
        <i class="iconfont icon-bofang start" @click="startSong(item.id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import {getSong} from '../../../request/song'

export default {
  data(){
    return{
      songs:[]
    }
  },
  created(){
    this._getSong()
  },
  methods:{
    _getSong(){
      getSong().then(res => {
        this.songs = res.result
      })
    },
    startSong(id){
      this.$router.push(`/findSong/${id}`)
    },
  }
}
</script>

<style scoped>
  .song{
    font-size: 17px;
    color: #333;
    display: flex;
    flex-wrap: wrap;
  }
  .title{
    height: 45px;
    padding-top: 20px;
    font-size: 17px;
    margin-bottom: 14px;
  }
  .title span{
    border-left: 2px solid #D43C33;
    padding-left: 9px;
  }
  .song .start{
    font-size: 23px;
    padding: 0 10px;
    color: #888;
  }
  .song-name{
    width:  100%;
    display: flex;
    padding: 6px 0 6px 10px;
  }
  .song .song-name .info{
    text-overflow: ellipsis;
    overflow:hidden;
    white-space: nowrap;
    width: 320px;
    flex:1
  }
  .song .from{
    color: #888;
  }
  .song .more{
    color: #888;
    font-size: 12px;
    display: flex;
  }
  .song .more .bg{
    position: relative;
    top: 4px;
    left: 2px;
    background: url('../../../assets/img/index_icon_2x.png') no-repeat;
    background-size: 166px 97px;
    padding: 0 10px;
  }
  .song img{
    width: 123px;
    height: 123px;
  }
</style>