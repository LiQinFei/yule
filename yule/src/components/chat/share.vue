<template>
  <div>
    
      <mt-header class="heards">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button size="small" type="default" slot="right">分享文章</mt-button>
      </mt-header>
         <mt-cell class="lis" is-link>
           <div>
             <img src="../../assets/fenxiang.jpg" alt="">
           </div>
           <div>
              <h4>大家好<span>——大秦之子</span></h4>
              <p>分享生活每一天</p>
           </div>
         </mt-cell>
          <mt-cell class="lis" is-link>
           <div>
             <img src="../../assets/fenxiang.jpg" alt="">
           </div>
           <div>
              <h4>大家好</h4>
              <p>分享生活每一天</p>
           </div>
         </mt-cell>


       
  </div>
</template>

<script>
 import { Toast } from 'mint-ui'
export default {
  data(){
    return {
        
    }
  },created(){
          
        },
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
    }
}
</script>

<style scoped lang="scss">

    .lis{
     
      display: flex;
  

      div{
        &:first-child{
            width: 30%;
             padding: 0.5rem;
             box-sizing: border-box;
            img{
              width: 100%;
            }
        }
        &:last-child{
            width: 70%;
            padding-left: 1rem;
          h4{
            span{
              display: inline-block;
              margin-left: 1rem;
              font-size: 0.7rem;
            }
          }
           
            p{
              margin-top: 0.5rem;
              font-size: 0.8rem;
            }
        }
      }
    }
  
</style>
