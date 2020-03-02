import {request} from './request'

export function getSong(){
  return request({
    url:'personalized/newsong',
    // withCredentials: true
  })
}

export function getUrl(id){
  return request({
    url:'music/url',
    params:{
      id:id
    }
  })
}

export function getDetail(id){
  return request({
    url:'song/detail',
    params:{
      ids:id
    }
  })
}