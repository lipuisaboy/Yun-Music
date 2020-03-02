import axios from 'axios'

export function request(options){
  return new Promise((resolve, reject) => {
    const http = axios.create({
      baseURL: 'http://musicapi.leanapp.cn/',
      timeout: 5000,
      withCredentials: true
    })
  // 过滤器(拦截器)
  http.interceptors.response.use(res => {
    return res.data
  })

  // 通过实例发送网络请求
  http(options)
    .then(res => {
      resolve(res)
    }).catch(err => {
    reject(err)
  })
})
}

export function request2(options){
  return new Promise((resolve,reject) => {
    const pop = axios.create({
      baseURL: 'https://v1.itooi.cn/',
      timeout:5000,
      withCredentials: true
    })
    pop.interceptors.response.use(res => {
      return res.data
    })
  
    // 通过实例发送网络请求
    pop(options)
      .then(res => {
        resolve(res)
      }).catch(err => {
      reject(err)
    })
  })
}