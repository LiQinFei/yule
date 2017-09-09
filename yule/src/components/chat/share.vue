<template>
  <div class="boxs">
    
       <mt-header class="heards" fixed>
        
          <mt-button icon="back"  @click="back" slot="left">返回</mt-button>
      

         <router-link to="/text" slot="right">
        <mt-button  >发表文章</mt-button>
          </router-link>
      </mt-header>

          
         <ul>
        
          <li class="lis" is-link v-for="item in data">
            <router-link :to="'/textdetail/'+item.ID">
                    <div>
                      <img :src="'http://139.224.227.124:3000/images/'+item.src" alt="">
                    </div>
                    <div>
                        <h4>{{item.title}}<span>——{{item.name}}</span></h4>
                        <p>{{item.introduction}}</p>
                    </div>
            </router-link>
         </li>        
         </ul>
        
      
    

       
  </div>
</template>

<script>
 import { Indicator } from 'mint-ui'
 import { Toast } from 'mint-ui'
export default {
  data(){
    return {
        data:''
    }
  },beforeCreate(){
       Indicator.open()
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
          
        },activated(){
      
          
            this.getList()
        }
        
        ,methods:{
             getList(){
          var that = this
           this.$ajax({
                  method: 'get',
                  url: url+'getlist',
                  data: {
                      
                  }
              }).then(function(res){
          
                
               
                that.data = res.data
                  
                  
                  
              })
          },back(){
           this.$router.back(-1)
         }
        }

}
</script>

<style scoped lang="scss">
.boxs{
  padding-top: 40px;
  box-sizing: border-box;
}
    ul{
      width: 100%;
      height: 100%;
      overflow: auto;
    }
    .lis{
      border-bottom: 1px solid #dddddd;
      a{

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
  
  
</style>
