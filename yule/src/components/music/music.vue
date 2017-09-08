<template>
  <div class="allbox">
     <mt-header fixed class="heards">
          <mt-button icon="back" @click="back" slot="left">返回</mt-button>
      </mt-header>
<div class="top">
  <div>
    <input class="contents" v-model="value" placeholder="请输入歌曲命或歌手">
  </div>
  <div>
    <mt-button class="gos" type="default" @click="sech(1)">搜索</mt-button>
  </div>
</div>
 <div class="boxs">

    <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
         <li class="lis" is-link v-for="item in data" @click="todei(item)">
            
                    <div>
                      <img :src="item.albumpic_small" alt="">
                    </div>
                    <div>
                        <h4>{{item.songname}}</h4>
                        <p>{{item.singername}}</p>
                    </div>
            
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
        },
        
        methods:{
             sech(s){
                var that = this
               if(s == 1){
                 that.n = 1
                 that.data = []
                 that.loading=true
               }
                Indicator.open()
              var name = encodeURIComponent(this.value)
              this.$ajax.get('http://route.showapi.com/213-1?showapi_appid=27325&showapi_sign=0143f400b1ff4923bc9dc25a40b55370&keyword='+name+'&page='+this.n)
                .then(function (response) {
                  Indicator.close()
                  if( response.data.showapi_res_code == 0){
                       console.log(response.data.showapi_res_body.pagebean)     
                      that.data = that.data.concat(response.data.showapi_res_body.pagebean.contentlist) 
                      
                       console.log(that.data)
                    
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
                    
              
             
            },todei(item){


                  var oo = JSON.stringify(item)
                  localStorage.setItem('dei',oo)
                  this.$router.push({'name':'musicdei'})


            } 
        }
}
</script>
<style scoped lang="scss">
.allbox{  
  padding-top: 90px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
.top{
  position: fixed;
  top: 40px;
  width: 100%;
  height: 3rem;
  display: flex;
  padding-top: 0.3rem;
  div{
      height: 3rem;
     
    &:first-child{
      flex:  1;
      padding: 0rem 1rem 1rem;
      box-sizing: border-box;
      input{
        height: 2.5rem;
        width: 100%;
        border-radius: 10px;
        outline: none;
        border: 1px solid #dddddd;
        padding: 0.2rem 1rem;
        box-sizing: border-box;
      }
    }
    &:last-child{
    flex: 0 0 4rem;
    padding: 0.2rem 0.5rem;
    .gos{
      height: 2rem;
    }
    }
  }
}
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
      border-bottom: 1px solid #dddddd;
   

        color: #888;
        display: flex;
      div{
        &:first-child{
            flex: 0 0 5rem;
            height: 5rem;
             padding: 0.5rem;
             box-sizing: border-box;
            img{
              width: 100%;
              height: 100%;
            }
        }
        &:last-child{
            flex: 1;
            padding-left: 1rem;
          h4{
            margin-top: 1rem;
            position: relative;
            span{
              position: absolute;
              
              display: inline-block;
              right: 1rem;
              top: 2rem;
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

}

}
  
</style>
