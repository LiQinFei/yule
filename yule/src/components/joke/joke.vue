<template>
  <div class="allbox">
     <mt-header fixed class="heards">
          <mt-button icon="back" @click="back" slot="left">返回</mt-button>
      </mt-header>
 <div class="boxs">

    <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
         <li class="lis" is-link v-for="list in data">
            <img :src="list.img" alt="">
            <h3>{{list.title}}</h3>
            <p>{{list.ct}}</p>
                  
            
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
        data:[],
        value:'',
        loading:true,
        n:1
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
              
              this.$ajax.get('http://route.showapi.com/341-3?showapi_appid=27325&showapi_sign=0143f400b1ff4923bc9dc25a40b55370&page='+this.n)
                .then(function (response) {
                  Indicator.close()
                 
                  if( response.data.showapi_res_code == 0){
                          
                       that.data = that.data.concat(response.data.showapi_res_body.contentlist) 
                      
                      

                    
                               that.loading = false;
                             
                      

                              
                      
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
            },loadMore() {
           
              this.loading = true;
              this.n +=1
            
                this.sech()
                    
              
             
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
