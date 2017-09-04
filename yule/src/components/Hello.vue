<template>
 
 <div>  
   
   <mt-header class="heards" fixed title="大秦之子">
      <mt-button icon="more" slot="right"></mt-button>
   </mt-header>
    <!-- tabcontainer -->  
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="jiaoliu">
      
      <!-- 聊天 -->
            <mt-cell title="一起来吐槽" label="万人同时在线聊天，快乐无极限" is-link></mt-cell>
            <mt-cell title="分享留言" label="留下自己的脚步，分享自己的快乐" is-link></mt-cell>
          
        </mt-tab-container-item>
    
        <mt-tab-container-item id="kuaile">
          <!-- 娱乐 -->
              <mt-cell title="大秦音乐" label="百万音乐等你听" is-link></mt-cell>
              <mt-cell title="藏头诗生成" label="百万音乐等你听" is-link></mt-cell>
              <mt-cell title="星座运势" label="百万音乐等你听" is-link></mt-cell>
        </mt-tab-container-item>
         <mt-tab-container-item id="users">
           <!-- 我的 -->
          <mt-cell v-for="n in 20" title="tab-container 3"></mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    
  
    <mt-tabbar v-model="selected" fixed>  
      <mt-tab-item id="jiaoliu">  
        <img slot="icon" src="../assets/cry.png">  
        交流  
      </mt-tab-item>  
    
      <mt-tab-item id="kuaile">  
        <img slot="icon" src="../assets/cry.png">  
        娱乐生活 
      </mt-tab-item>  
      <mt-tab-item id="users">  
        <img slot="icon" src="../assets/cry.png">  
        我的  
      </mt-tab-item>  
    </mt-tabbar>  
  </div>  
</template>

<script>



export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected:'kuaile'
    }
  },created(){
  
  },mounted(){
       console.log(this.selected)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .swiperOne img{
    width: 100%;
    height: 100%;
  }
    
</style>
