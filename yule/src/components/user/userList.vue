<template>
  <div>
    
       <mt-header class="heards">
        
          <mt-button icon="back"  @click="back" slot="left">返回</mt-button>
      

         <router-link to="/text" slot="right">
        <mt-button>发表文章</mt-button>
          </router-link>
      </mt-header>

          <mt-cell v-for="list in data" v-bind:title="list.title" class="lists" :to="'/textdetail/'+list.ID">
            <mt-button class="buttons" type="danger" v-on:click.stop.prevent ="del(list.ID)">删除</mt-button>
            <img slot="icon" :src="'http://139.224.227.124:3000/images/'+list.src" width="25" height="25">
        </mt-cell>
        
        
      
    

       
  </div>
</template>

<script>
 import { Toast } from 'mint-ui'
 import { MessageBox } from 'mint-ui';
 import { Indicator } from 'mint-ui';

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
    }
  ,beforeRouteEnter(to, from, next) {
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
         let oo = localStorage.getItem("name");
           this.getList(oo)
        },methods:{
             getList(oo){
          var that = this
           this.$ajax({
                  method: 'post',
                  url: url+'userlist',
                  data: {
                      name:oo
                  }
              }).then(function(res){              
            that.data =  res.data                  
              })
          },back(){
           this.$router.back(-1)
         },del(id){
           var that = this
           MessageBox.confirm('确定删除？').then(action => {
       Indicator.open()
                  
           this.$ajax({
                  method: 'post',
                  url: url+'dellist',
                  data: {
                      id:id
                  }
              }).then(function(res){  
        Indicator.close()
                            
                  if(res.data.status == '1'){
                    Toast({
                      message: '删除成功',
                      position: 'bottom',
                      duration: 2000
                  }) 
                  that.$router.go(0)
                  }else{
                      Toast({
                      message: '删除失败',
                      position: 'bottom',
                      duration: 2000
                  });
                  }             
              })  
            })
          }
          }

}
</script>

<style scoped lang="scss">

   .lists{
     .buttons{
       height: 2rem;
     }
   }
  
  
</style>
