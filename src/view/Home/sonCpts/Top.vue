<template>
  <div class="head">
<<<<<<< HEAD
    <img src='../../../assets/img/wyy.png'/>
    <span class="text">
      听音乐
    </span>
    <a href="#">下载App</a>
=======
    <img src="../../../assets/img/wyy.png" />
    <span class="text">播放器</span>
    <a href="#">下载</a>
>>>>>>> e268d3f1ba56bf2e0f3652c1ba5abde05fc06083
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
body {
  font: 14px/1.5 Helvetica, sans-serif, STHeiTi;
}
.head {
  height: 84px;
  width: 100%;
  background-color: #d43c33;
  position: relative;
}
.head img {
  height: 24px;
  width: 24px;
  position: absolute;
  left: 10px;
  top: 50%;
  margin-top: -12px;
}
.head .text {
  color: #fff;
  line-height: 84px;
  height: 100%;
  font-size: 25px;
  margin-left: 40px;
}
.head a {
  display: block;
  height: 36px;
  width: 100px;
  text-decoration: none;
  color: #d43c33;
  border-radius: 40px;
  background-color: #fff;
  text-align: center;
  line-height: 36px;
  position: absolute;
  top: 50%;
  margin-top: -18px;
  right: 10px;
}
</style>