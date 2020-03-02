import {request} from './request'

export function getPick(value){
  return request({
    url:'search/multimatch',
    params:{
      keywords:value
    }
  })
}