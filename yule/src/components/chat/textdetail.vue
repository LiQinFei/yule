<template>
  <div>
    
      <mt-header class="heards">
        
          <mt-button icon="back"  @click="back" slot="left">返回</mt-button>
      

         <router-link to="/text" slot="right">
        <mt-button  >发表文章</mt-button>
          </router-link>
      </mt-header>
        <div class="content">

        
        <div class="top">
          <h3>
            {{data.title}}
                    
          </h3>
          
        </div>
        
        <div class="intro">
              <span >{{data.introduction}}</span>
              <span>{{data.data}}</span>
              <span>作者：{{data.name}}</span>
        </div>
        <div class="line"></div>

          <p class="text">
            {{data.content}}
          </p>


      </div>
        
      
    

       
  </div>
</template>

<script>
 import { Indicator } from 'mint-ui';

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
          
        }
        ,activated(){
          Indicator.open()
             var id =  this.$route.params
           this.getList(id)
        },deactivated(){
          this.data = ''
        }
        ,methods:{
             getList(id){
          var that = this
           this.$ajax({
                  method: 'post',
                  url: url+'textdetail',
                  data: {
                      user_id: id
                  }
              }).then(function(res){
          
                
                  

                  that.data = res.data[0]
                  
                  
              })
          },back(){
           
           this.$router.back(-1)
         }
        }

}
</script>

<style scoped lang="scss">
.content{
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}
  .top{
    position: relative;
  
  }
  h3{
    text-align: center;
    padding: 0 0 1rem 0;

  }
  .intro{
    text-align: center;
    position: relative;
    span{
      display: block;
      &:first-child{
        font-size: 1rem;
        margin-bottom: 0.5rem;
         font-size: 0.8rem;
      }
      &:nth-child(2){
        font-size: 0.7rem;
        display: inline-block;
        
      }
      &:nth-child(3){
        font-size: 0.7rem;
        display: inline-block;
        margin-left: 1rem;       
      }
    }
  }
  .line{
    width: 100%;
    margin:1rem 0;
    border-bottom: 1px solid #dddddd;
  }
  .text{
    text-indent: 2em;
    font-size: 0.9rem;
    line-height: 1.5em;
  }
</style>
