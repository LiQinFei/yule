<template>
 
 <div>  
   
 
    <mt-header class="heards"  title="登陆">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>


    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>

  <div class="butt">
    <mt-button type="default" size="large"  @click.native="login">登陆</mt-button>    
   
    <mt-button class="regiset" type="default" size="large" @click="register">注册</mt-button>
  </div>
   
</mt-field>
  </div>  



</template>

<script>

import { Indicator } from 'mint-ui';

 import { Toast } from 'mint-ui'
export default {
  name: 'hello',
  data () {
    return {
        
            username:'',
            password:''

    }
  },created(){
    
  
  },beforeCreate(){
    //   Indicator.open()
    }
    , updated(){
      Indicator.close()
    }
  ,
  mounted(){
      
  },methods:{
      register(){
          this.$router.push({name:'register'})
      },
      login(){
           var that = this
                 Indicator.open()     

             this.$ajax({
                method: 'post',
                url: url+'login',
                data: {
                    username: this.username,
                    password:this.password
                }
            }).then(function(res){
                    Indicator.close()
                        
                    switch (res.data.status){
                        case '0':
                         Toast({
                            message: res.data.msg,
                            position: 'bottom',
                            duration: 2000
                        });
                     
                        break;
                        case '1':
                        localStorage.setItem('user_id',res.data.user_id)
                        localStorage.setItem('name',res.data.name)
                        that.$router.push({name:'index'})
                        Toast({
                            message: res.data.msg,
                            position: 'bottom',
                            duration: 2000
                        });
                        break;
                        case '-1':
                        Toast({
                            message: res.data.msg,
                            position: 'bottom',
                            duration: 2000
                        });   
                        break;


                    }
               
            })
      }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .butt{
        margin-top: 50px;
        padding: 20px;
        .regiset{
            margin-top: 20px;
        }
    }
    
</style>
