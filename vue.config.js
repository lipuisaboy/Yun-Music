module.exports = {
  publicPath:'./',
  aevServer:{
    open:true,
    host:"localhost",
    port:8080,
    https:false,
    hotOnly:false,
    proxy:{
      '/api':{
        target:"http://yangxc.cn:7001/test-api",
        ws:true,
        changOrigin:true,
        pathRewrite:{
          '^/api':'/'
        }
      }
    }
  }
}