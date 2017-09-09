<template>
  <div class="allbox">
     <mt-header fixed class="heards" title="历史的今天">
          <mt-button icon="back" @click="back" slot="left">返回</mt-button>
      </mt-header>
 <div class="boxs">

    <ul>
         <li class="lis" is-link v-for="list in data">
            <img :src="list.img" alt="">
            <h3>{{list.title}}</h3>
            <p>{{list.year}}年{{list.month}}月{{list.day}}日</p>
                  
            
         </li>  
      </ul>

  </div>
</div>
</template>
<script>

 import { Indicator } from 'mint-ui'
 import { Toast } from 'mint-ui'
import Vue from 'vue'
export default {
  data(){
    return {
        data:[]
     
     
    }
  },beforeCreate(){
      //  Indicator.open()
    }
    , updated(){
      Indicator.close()
       
    },beforeRouteEnter(to, from, next) {
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
  created(){
          //  this.getList()
          this.sech()
        },
        
        methods:{
             sech(){
                var that = this
              
                Indicator.open()
            var datas = new Date();
           var month = datas.getMonth()+1
            var day = datas.getDate()
           if(month.toString().length<=1){
               month = '0'+month
           } 
           if(day.toString().length <=1){
             day = '0'+day
           }
           var allday = month + day
          
           
              this.$ajax.get('http://route.showapi.com/119-42?showapi_appid=27325&showapi_sign=0143f400b1ff4923bc9dc25a40b55370&date='+allday)
                .then(function (response) {
                  Indicator.close()
                 
                  if( response.data.showapi_res_code == 0){
                          
                       that.data = response.data.showapi_res_body.list
                  

                    
                             
                      

                              
                      
                  }else{
                         Toast({
                        message: '没有更多数据了',
                        position: 'bottom',
                        duration: 2000
                    });   
                  }
                })
            
              },back(){
               this.$router.back(-1)
            } 
        }
}
</script>
<style scoped lang="scss">
.allbox{  
  padding-top: 40px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
.boxs{
  width: 100%;
  height: 100%;

  box-sizing: border-box;
 overflow: auto;

 ul{
      width: 100%;
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
    }
    .lis{
      width: 100%;
        color: #888;
       margin-bottom: 2rem;
       h3{
         padding-left: 1rem;
         box-sizing: border-box;
       }
       p{
          padding-left: 1rem;
         box-sizing: border-box;
       }
     img{
       width: 100%;
     }
    
    }

}

}
  
</style>
