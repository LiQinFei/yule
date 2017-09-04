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



export default {
  name: 'hello',
  data () {
    return {
            username:'',
            password:''

    
    }
  },created(){
    
  
  },mounted(){
      
  },methods:{
      register(){
          this.$router.push({name:'register'})
      },
      login(){
          console.log(8)
             this.$ajax({
                method: 'post',
                url: 'http://www.localhost:3000/login',
                data: {
                    username: this.username,
                    password:this.password
                }
            }).then(function(res){
                console.log(res)
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
