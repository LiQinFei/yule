<template>
  <div>
        <mt-cell title="标题文字" is-link>
            <span>icon 是图片</span>
            <img slot="icon" src="../../assets/fenxiang.jpg" width="24" height="24">
        </mt-cell>
  </div>
</template>

<script>
 import { Toast } from 'mint-ui'
export default {
beforeRouteEnter(to, from, next) {
      let oo = localStorage.getItem("user_id");
      if(oo == null){
          Toast({
            message: '请先登录',
            position: 'bottom',
            duration: 2000
        });   
        next({path : '/login'})
      } else {
        next()
      }
    },
}
</script>

<style>

</style>
