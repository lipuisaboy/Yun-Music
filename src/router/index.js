import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../view/Home/Home.vue')
const FindSong = () => import('../view/findSong/FindSong.vue')
const PickAlbum = () =>import('../view/Pick/PickAlbum.vue')
const PickSinger = () => import('../view/Pick/PickSinger.vue')
const PickMv = () => import('../view/Pick/PickMv.vue')
const PickRadio = () => import('../view/Pick/PickRadio.vue')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const routes = [
  {
    path:'/',
    redirect: '/home'
  },
  {
    name:'home',
    path:'/home',
    component:Home,
  },
  {
    name:'find-song',
    path:'/findSong/:id',
    component:FindSong
  },
  {
    name:'pick-album',
    path:'/pick/album/:id',
    component:PickAlbum
  },
  {
    name:'pick-singer',
    path:'/pick/singer/:id',
    component:PickSinger
  },
  {
    name:'pick-mv',
    path:'/pick/mv/:id',
    component:PickMv
  },
  {
    name:'pick-radio',
    path:'/pick/radio/:id',
    component:PickRadio
  }
]

const router = new VueRouter({
  routes,
  // mode:'history'
})

export default router