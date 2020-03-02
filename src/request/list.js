import {request} from './request'

export function getList(){
  return request({
    url:'personalized',
    params:{
      limit:'6'
    }
  })
}