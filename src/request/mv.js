import {request} from './request'

export function getMv(id){
  return request({
    url:'mv',
    params:{
      mvid:id
    }
  })
}