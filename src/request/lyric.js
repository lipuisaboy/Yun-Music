import {request2} from './request'

export function getLyric(id){
  return request2({
    url:'netease/lrc',
    params:{
      id:id,
      tdsourcetag:'s_pcqq_aiomsg'
    },
    withCredentials: true
  })
}