<template>
  <div>
    <div class="search">
      <div class="top">
        <i class="iconfont icon-sousuo1 icon"></i>
        <input type="text" class="in-search" placeholder="搜索歌曲、歌手、专辑" @keyup="getWant($event)"  @keydown="toChange()">
      </div>
    </div>
    <div class="body" v-if="isShow">
      <div class="title">热门搜索</div>
      <div class="mr">
        <div v-for="(item,index) in list" :key="index" class="hot-list" @click="hotSearch(item.first)">
          {{item.first}}
        </div>
      </div>
      <div v-if="arr.length">
        <div v-for="(item,index) in arr" :key="index" class="history">
          <i class="iconfont icon-lishi icon1"></i>
          <div class="his-name">{{item}}</div>
          <i class="iconfont icon-error icon2" @click="removeHis(item)"></i>
      </div>
      </div>
    </div>
    <div class="suggest" v-if="isSuggest">
      <div class="sug-top">搜索"{{value}}"</div>
      <div v-for="(item,index) in suggest" :key="index" class="sug-info" @click="toPlay(item.id)"> 
        <i class="iconfont icon-sousuo1 sear"></i>
        <div class="sug-name">
          <span>{{item.name}}</span>
          <span> - </span>
          <span v-if="item.artists">{{item.artists[0].name}}</span>
        </div>
      </div>
    </div>
    <div class="want" v-if="isHidden">
      <div class="more-pick" v-if="pick">
        <div class="title">最佳匹配</div>
        <div v-if="pick.album" class="pick-one" @click="toAlbum(pick.album[0].id)">
          <div class="album">
            <img :src="pick.album[0].blurPicUrl" alt="">
          </div>
          <div class="pick-info">
            <h4>专辑:
              <span v-if="pick.album[0].name.indexOf(value) >= 0">{{pick.album[0].name.slice(0,pick.album[0].name.indexOf(value))}}</span>
              <span v-if="pick.album[0].name.indexOf(value) >= 0" style="color:#507daf">{{pick.album[0].name.slice(pick.album[0].name.indexOf(value),pick.album[0].name.indexOf(value)+value.length)}}</span>
              <span v-if="pick.album[0].name.indexOf(value) >= 0">{{pick.album[0].name.substr(pick.album[0].name.indexOf(value)+value.length)}}</span>
              <span v-else-if="pick.album[0].name.indexOf(value) < 0">{{pick.album[0].name}}</span>
            </h4>
            <p>
              <span v-if="pick.album[0].artist.name.indexOf(value) >= 0">{{pick.album[0].artist.name.slice(0,pick.album[0].artist.name.indexOf(value))}}</span>
              <span v-if="pick.album[0].artist.name.indexOf(value) >= 0" style="color:#507daf">{{pick.album[0].artist.name.slice(pick.album[0].artist.name.indexOf(value),pick.album[0].artist.name.indexOf(value)+value.length)}}</span>
              <span v-if="pick.album[0].artist.name.indexOf(value) >= 0">{{pick.album[0].artist.name.substr(pick.album[0].artist.name.indexOf(value)+value.length)}}</span>
              <span v-else-if="pick.album[0].artist.name.indexOf(value) < 0">{{pick.album[0].artist.name}}</span>
            </p>
          </div>
          <i class="iconfont icon-right right"></i>
        </div>
        <div v-if="pick.artist" class="pick-one" @click="toSinger(pick.artist[0].id)">
           <div class="artist">
            <img :src="pick.artist[0].picUrl" alt="">
          </div>
          <div class="pick-info">
            <h4 class="artist-h">歌手:
              <span v-if="pick.artist[0].name.indexOf(value) >= 0">{{pick.artist[0].name.slice(0,pick.artist[0].name.indexOf(value))}}</span>
              <span v-if="pick.artist[0].name.indexOf(value) >= 0" style="color:#507daf">{{pick.artist[0].name.slice(pick.artist[0].name.indexOf(value),pick.artist[0].name.indexOf(value)+value.length)}}</span>
              <span v-if="pick.artist[0].name.indexOf(value) >= 0">{{pick.artist[0].name.substr(pick.artist[0].name.indexOf(value)+value.length)}}</span>
              <span v-else-if="pick.artist[0].name.indexOf(value) < 0">{{pick.artist[0].name}}</span>
            </h4>
          </div>
          <i class="iconfont icon-right right"></i>
        </div>
        <div v-if="pick.mv" class="pick-one" @click="toMv(pick.mv[0].id)">
          <div class="mv">
            <i class="iconfont icon-bofang mv-icon"></i>
            <img :src="pick.mv[0].cover" alt="">
          </div>
          <div class="pick-info">
            <h4>MV:
              <span v-if="pick.mv[0].name.indexOf(value) >= 0">{{pick.mv[0].name.slice(0,pick.mv[0].name.indexOf(value))}}</span>
              <span v-if="pick.mv[0].name.indexOf(value) >= 0" style="color:#507daf">{{pick.mv[0].name.slice(pick.mv[0].name.indexOf(value),pick.mv[0].name.indexOf(value)+value.length)}}</span>
              <span v-if="pick.mv[0].name.indexOf(value) >= 0">{{pick.mv[0].name.substr(pick.mv[0].name.indexOf(value)+value.length)}}</span>
              <span v-else-if="pick.mv[0].name.indexOf(value) < 0">{{pick.mv[0].name}}</span>
            </h4>
            <p v-if="pick.mv[0].artists">
              <span v-if="pick.mv[0].artists[0].name.indexOf(value) >= 0">{{pick.mv[0].artists[0].name.slice(0,pick.mv[0].artists[0].name.indexOf(value))}}</span>
              <span v-if="pick.mv[0].artists[0].name.indexOf(value) >= 0" style="color:#507daf">{{pick.mv[0].artists[0].name.slice(pick.mv[0].artists[0].name.indexOf(value),pick.mv[0].artists[0].name.indexOf(value)+value.length)}}</span>
              <span v-if="pick.mv[0].artists[0].name.indexOf(value) >= 0">{{pick.mv[0].artists[0].name.substr(pick.mv[0].artists[0].name.indexOf(value)+value.length)}}</span>
              <span v-else-if="pick.mv[0].artists[0].name.indexOf(value) < 0">{{pick.mv[0].artists[0].name}}</span>
            </p>
          </div>
          <i class="iconfont icon-right right"></i>
        </div>
        <div v-if="pick.radio" class="pick-one" @click="toRadio(pick.radio[0].id)">
          <div class="radio">
            <img :src="pick.radio[0].picUrl" alt="">
          </div>
          <div class="pick-info">
            <h4 class="artist-h">主播电台:
              <span v-if="pick.radio[0].name.indexOf(value) >= 0">{{pick.radio[0].name.slice(0,pick.radio[0].name.indexOf(value))}}</span>
              <span v-if="pick.radio[0].name.indexOf(value) >= 0" style="color:#507daf">{{pick.radio[0].name.slice(pick.radio[0].name.indexOf(value),pick.radio[0].name.indexOf(value)+value.length)}}</span>
              <span v-if="pick.radio[0].name.indexOf(value) >= 0">{{pick.radio[0].name.substr(pick.radio[0].name.indexOf(value)+value.length)}}</span>
              <span v-else-if="pick.radio[0].name.indexOf(value) < 0">{{pick.radio[0].name}}</span>
            </h4>
          </div>  
          <i class="iconfont icon-right right"></i>
        </div>
      </div>
      <div v-for="(item,index) in find" :key="index" class="info" @click="toPlay(item.id)"> 
        <div class="all-name">
          <div class="name">
            <span v-if="item.name.indexOf(value) >= 0">{{item.name.slice(0,item.name.indexOf(value))}}</span>
            <span v-if="item.name.indexOf(value) >= 0" style="color:#507daf">{{item.name.slice(item.name.indexOf(value),item.name.indexOf(value)+value.length)}}</span>
            <span v-if="item.name.indexOf(value) >= 0">{{item.name.substr(item.name.indexOf(value)+value.length)}}</span>
            <span v-else>{{item.name}}</span>
          </div>
          <div v-if="item.ar" class="singer-name">

            <i class="sq" v-if="item.privilege.maxbr && item.privilege.maxbr > 320000"></i>

            <span v-if="item.ar[0].name.indexOf(value) >= 0">{{item.ar[0].name.slice(0,item.ar[0].name.indexOf(value))}}</span>
            <span v-if="item.ar[0].name.indexOf(value) >= 0" style="color:#507daf">{{item.ar[0].name.slice(item.ar[0].name.indexOf(value),item.ar[0].name.indexOf(value)+value.length)}}</span>
            <span v-if="item.ar[0].name.indexOf(value) >= 0">{{item.ar[0].name.substr(item.ar[0].name.indexOf(value)+value.length)}}</span>
            <span v-else-if="item.ar[0].name.indexOf(value) < 0">{{item.ar[0].name}}</span>

            <span v-if="item.ar[1]"> / </span>

            <span v-if="item.ar[1] && item.ar[1].name.indexOf(value) >=0">{{item.ar[1].name.slice(0,item.ar[1].name.indexOf(value))}}</span>
            <span style="color:#507daf" v-if="item.ar[1] && item.ar[1].name.indexOf(value) >= 0">{{item.ar[1].name.slice(item.ar[1].name.indexOf(value),item.ar[1].name.indexOf(value)+value.length)}}</span>
            <span v-if="item.ar[1] && item.ar[1].name.indexOf(value) >= 0">{{item.ar[1].name.substr(item.ar[1].name.indexOf(value)+value.length)}}</span>
            <span v-else-if="item.ar[1] && item.ar[1].name.indexOf(value) < 0">{{item.ar[1].name}}</span>

            -
    
            <span v-if="item.al && item.al.name.indexOf(value) >= 0">{{item.al.name.slice(0,item.al.name.indexOf(value))}}</span>
            <span style="color:#507daf" v-if="item.al && item.al.name.indexOf(value) >= 0">{{item.al.name.slice(item.al.name.indexOf(value),item.al.name.indexOf(value)+value.length)}}</span>
            <span v-if="item.al && item.al.name.indexOf(value) >= 0">{{item.al.name.substr(item.al.name.indexOf(value)+value.length)}}</span>
            <span v-else-if="item.al && item.al.name.indexOf(value) < 0">{{item.al.name}}</span>
          </div>
        </div>
        <i class="iconfont icon-bofang start"></i>
      </div>
      <p @click="loadMore()">点击加载更多</p>
    </div>
  </div>
</template>

<script>
import {getSearch,getFind} from '../../request/search.js'
import {getPick} from '../../request/pick'
import {getRecommen} from '../../request/recommen'

export default {
  data(){
    return{
      isShow:true,
      isHidden:false,
      list:[],
      find:[],
      value:null,
      page:0,
      pick:{},
      currentArr:[],
      arr:[],
      suggest:[],
      isSuggest:false
    }
  },
  created(){
    this._getSearch()
    this.getArr()
  },
  methods:{
    _getSearch(){
      getSearch().then(res => {
        // window.console.log(res)
        this.list = res.result.hots
      })
    },
    toChange(){
      this.isShow = false;
      this.isHidden =  false;
      this.isSuggest = true;
      let put = document.getElementsByTagName('input')[0]
      this.value = put.value
      getRecommen(put.value).then(res => {
        this.suggest = res.result.songs
      })
    },
    getWant(event){
      window.console.log(event)
      if(event.keyCode == 13){
        this.isShow = false
        this.isSuggest = false
        this.isHidden = true
        let put = document.getElementsByTagName('input')[0]
        //存储sessionStorage
        this.currentArr.unshift(put.value)
        sessionStorage.setItem('arr',JSON.stringify(this.currentArr))
        window.console.log(sessionStorage)
        window.console.log(this.currentArr)
        let find = put.value
        this.value = put.value
        getFind(find,'song','20',this.page).then(res => {
            // window.console.log(res.data.songs)
            this.find = res.data.songs
        }) 
        getPick(find).then(res => {
          // window.console.log(res)
          this.pick = res.result
        })
      }
    },
    toPlay(id){
      this.$router.push(`/findSong/${id}`)
    },
    loadMore(){
      this.page += 1
      getFind(this.value,'song','20',this.page).then(res => {
        let arr = res.data.songs
        // window.console.log(arr)
        for(let i = 0; i < arr.length; i++){
          this.find.push(arr[i])
        }
      })
    },
    hotSearch(type){
      this.isShow = false
      this.isHidden = true
      let put = document.getElementsByTagName('input')[0]
      put.value = type
      this.value = type
      this.currentArr.unshift(this.value)
      sessionStorage.setItem('arr',JSON.stringify(this.currentArr))
      getFind(type,'song','20',this.page).then(res => {
        this.find = res.data.songs
        // window.console.log(this.find)
      })
      getPick(type).then(res => {
        // window.console.log(res.result)
        this.pick = res.result
      })
    },
    //判断session是否存在
    getArr(){
      if(sessionStorage.length && sessionStorage.getItem('arr') !== ''){
        this.currentArr = JSON.parse(sessionStorage.getItem('arr'))
        this.arr = JSON.parse(sessionStorage.getItem('arr'))
    }
  },
  //删除session
    removeHis(item){
      let remArr = JSON.parse(sessionStorage.getItem('arr').replace(item,''))
      window.console.log(remArr)
      let finArr = []
      for(let i in remArr){
        window.console.log(remArr[i])
        if(remArr[i] !== ''){
          finArr.push(remArr[i])
        }
      }
      this.currentArr = null;
      this.currentArr = finArr
      this.arr = null;
      this.arr = finArr
      window.console.log(finArr)
      sessionStorage.setItem('arr',JSON.stringify(finArr))
      window.console.log(sessionStorage.getItem('arr'))
      // this.getArr()
      // window.console.log(sessionStorage)
    },
    toAlbum(id){
      this.$router.push(`/pick/album/${id}`)
    },
    toSinger(id){
      this.$router.push(`/pick/singer/${id}`)
    },
    toMv(id){
      this.$router.push(`/pick/mv/${id}`)
    },
    toRadio(id){
      this.$router.push(`/pick/radio/${id}`)
    }
  }
}
</script>

<style scoped>
  .search{
    height: 60px;
    width: 375px;
    padding: 15px 10px;
    border-bottom: 1px solid #eaeaea;
  }
  .top{
    height: 30px;
    width: 100%;
    background: #ebecec;
    border-radius: 50px;
    display: flex;
    line-height: 30px;
  }
  .search .icon{
    font-size: 15px;
    color: #9f9f9f;
    margin: 0 8px;
  }
  .search .in-search{
    background-color: rgba(0,0,0,0);
    height: 30px;
    outline: none;
    border: none;
    padding: 0;
    width: 295px;
    font-size: 14px;
    color: #333;
  }
  .search .in-search::-webkit-input-placeholder{
    color:#d2d2d2;
    font-size:15px;
}
.body{
  width: 100%;
  height: 197px;
  padding: 15px 10px 0;
}
.body .mr{
  margin-bottom: 20px;
}
.body .title{
  color: #666;
  font-size: 12px;
  margin-bottom: 10px;
}
.body .hot-list{
  display: inline-block;
  height: 32px;
  line-height: 32px;
  padding: 0px 14px;
  border: 1px solid #d3d4da;
  border-radius: 32px;
  font-size: 14px;
  color: #333;
  margin: 0 0 8px 8px;
}
.want{
  height: 500px;
  width: 100%;
  color: #333;
}
.info{
  width: 100%;
  height: 55px;
  padding-left: 10px;
  border-bottom: 1px solid #eaeafa;
  display: flex;
}
.info .start{
  display: inline-block;
  line-height: 55px;
  font-size: 25px;
  color: #888;
  padding: 0 10px;
}
.want .name{
  font-size: 17px;
  color: #333;
}
.all-name{
  width: 270px;
  padding: 6px 0;
  flex: 1;
}
.all-name .name{
  width: 270px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.all-name .sq{
  background: url('../../assets/img/index_icon_2x.png');
  background-size:166px 97px;
  padding: 0 10px;
  position: relative;
  top: 3px;
  left: 2px;
}
.want .singer-name{
  width: 270px;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
p{
  text-align: center;
  color: #888;
  font-size: 11px;
}
.more-pick .title{
  color: #666;
  font-size: 12px;
  margin-left: 10px;
}
.pick-one img{
  width: 50px;
  height: 50px;
}
.pick-one{
  width: 100%;
  height: 66px;
  padding: 8px 10px 8px 0;
  margin-left: 10px;
  display: flex;
}
.album{
  position: relative;
}
.pick-one .album::after{
  background: url('../../assets/img/index_icon_2x.png');
  content: "";
  position: absolute;
  top: 2px;
  right: -10px;
  width: 10px;
  height: 46px;
  background-repeat: no-repeat;
  background-size: 166px 97px;
  background-position: 0 -30px;
}
.pick-one .pick-info{
  margin-left: 15px;
  flex: 1;
}
.pick-one .right{
  line-height: 50px;
  color: #888;
  margin-right: 15px;
}
.pick-one h4{
  padding: 0;
  margin: 0;
  font-weight: normal;
  font-size: 17px;
}
.pick-one p{
  margin: 0;
  padding: 0;
  text-align: left;
}
.artist-h {
  height: 50px;
  line-height: 50px;
}
.pick-one .mv img{
  height: 50px;
  width: 89px;
}
.pick-one .mv{
  height: 50px;
  width: 89px;
  position: relative;
}
.pick-one .mv .mv-icon{
  position: absolute;
  top: 50%;
  left: 50%;
  color: #fff;
  margin-left: -9px;
  margin-top: -10px;
}
.history{
  display: flex;
  height: 45px;
  width: 100%;
  line-height: 45px;
  border-bottom: 1px solid rgba(0,0,0,.05);
}
.icon1{
  font-size: 16px;
  color: rgba(0,0,0,.2);
}
.his-name{
  font-size: 14px;
  color: #333;
  width: 280px;
  margin-left: 20px;
}
.icon2{
  font-size: 13px;
  color: rgba(0,0,0,.3);
  margin-left: 20px;
}
.sug-top{
  font-size: 15px;
  color: #507DAf;
  height:50px;
  width: 100%;
  line-height: 50px;
  padding: 0 10px;
}
.sug-info{
  display: flex;
  height: 45px;
  width: 100%;
  padding:0 10px;
  line-height: 45px;
}
.sug-info .sear{
  font-size: 20px;
  color: rgba(0,0,0,.2);
}
.sug-info .sug-name{
  height: 45px;
  width: 280px;
  color: #333;
  font-size: 15px;
  margin-left: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>