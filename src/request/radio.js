import {request} from './request'

export function getRadio(id){
  return request({
    url:'dj/detail',
    params:{
      rid:id
    }
  })
}