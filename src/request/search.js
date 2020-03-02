import {request, request2} from './request'

export function getSearch(){
  return request({
    url:'search/hot/detail'
  })
}

export function getFind(find,type,size,page){
  return request2({
    url:'netease/search',
    params:{
      keyword:find,
      type:type,
      pageSize:size,
      page:page
    }
  })
}