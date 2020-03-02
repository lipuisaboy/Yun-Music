import {request} from './request'

export function getNumber(id){
  return request({
    url:'/top/list',
    params:{
      idx:id
    }
  })
}