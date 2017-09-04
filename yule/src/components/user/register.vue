<template>
 
 <div>  
   
 
    <mt-header class="heards"  title="注册">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>


   <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
    <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="生日" placeholder="请输入生日" type="date" v-model="birthday"></mt-field>

  <div class="butt">
    <mt-button type="default" size="large">注册</mt-button>    
  
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
            password:'',
            email:'',
            phone:'',
            birthday:''


    
    }
  },created(){
    
  
  },mounted(){
      
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
