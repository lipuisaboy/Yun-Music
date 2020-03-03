import {request} from './request'

export function getRecommen(val){
  return request({
    url:'search/suggest',
    params:{
      keywords:val,
      type:'mobile'
    }
  })
}