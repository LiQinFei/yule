<template>
 <div class="box">  
    <!-- tabcontainer -->  
      <mt-tab-container v-model="selected" class="boxs">
        <mt-tab-container-item id="jiaoliu" class="box1">
          <!-- <mt-header class="heards" fixed title="大秦之子">
      <mt-button icon="more" slot="right"></mt-button>
        </mt-header> -->
      <!-- 聊天 -->
            <ul class="list">
              <li>
               <router-link to="/chat">
                <img src="../assets/liaotian.jpg" alt="">
                <h4>万人吐槽</h4>
                </router-link>
              </li>
              <li>
                <router-link to="/share">
                    <img src="../assets/fenxiang.jpg" alt="">
                    <h4>分享留言</h4>
                </router-link>
              </li>
            </ul>
              <img class="box1bg" src="../assets/hei.jpg" alt="">

            <!-- <mt-cell title="一起来吐槽" label="万人同时在线聊天，快乐无极限" is-link></mt-cell>
            <mt-cell title="分享留言" label="留下自己的脚步，分享自己的快乐" is-link></mt-cell> -->
          
        </mt-tab-container-item>

        <mt-tab-container-item id="kuaile" class="box2">
          <!-- 娱乐 -->
              <!-- <mt-cell title="大秦音乐" label="百万音乐等你听" is-link></mt-cell>
              <mt-cell title="藏头诗生成" label="百万音乐等你听" is-link></mt-cell>
              <mt-cell title="星座运势" label="百万音乐等你听" is-link></mt-cell> -->
            <img class="box2bg" src="../assets/huoche.jpg" alt="">
            <div class="sli">
              <div class="slis">
                  <ul class="slis1">
                    <li>大秦音乐</li>
                    <li>藏头诗生成</li>
                    <li>星座运势</li>
                    <li>你好</li>
                    
                  </ul>
                  <ul class="slis2">
                 
                      <li>你好</li>
                    <li>你好</li>
                    <li>你好</li>
                    <li>你好</li>
                    <li>你好</li>
                    <li>你好</li>
                    <li>你好</li>
                    <li>你好</li>
                    <li>你好</li><li>你好</li>
                    <li>你好</li>
                    <li>你好</li>
                    <li>你好</li><li>你好</li>
                    <li>你好</li>
                    <li>你好</li>
                  
                  </ul>
              </div>

            </div>

        </mt-tab-container-item>
         <mt-tab-container-item class="box3" id="users">
           <!-- 我的 --> 
          <div class="header_src">
           <img  v-bind:src="src" alt="">  
           <input type="file" @change="onFileChange" accept="image/*" >
           <p>修改图像</p>
            <mt-button type="danger" v-if="upImg" @click="upImgs">确定修改</mt-button>
          </div>

          <mt-cell v-bind:title="'昵称：'+data.username" ></mt-cell>
          <mt-cell v-bind:title="'电话：'+data.phone" ></mt-cell>
          <mt-cell v-bind:title="'email：'+data.email" ></mt-cell>
          <mt-cell v-bind:title="'出生日期：'+data.birthday" ></mt-cell>
          <div class="close">
              <mt-button type="default" size="large" @click="close">退出登录</mt-button>
          </div>
          
       
    
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
      <mt-tab-item id="users" @click.native="denglu()">  
        <img slot="icon" src="../assets/cry.png">  
        我的  
      </mt-tab-item>  
    </mt-tabbar>  
  </div>  
</template>

<script>
var url = 'http://www.localhost:3000/'
 import { Toast } from 'mint-ui'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected:'kuaile',
      user:'',
      data:[],
      src:'',
      upImg:false
    }
  },created(){
    this.user =  localStorage.getItem("user_id")
    if(this.user){
        this.getUser()
    }
 
  },mounted(){
     
  },methods:{
    getUser(){
            var that = this
           this.$ajax({
                  method: 'post',
                  url: url+'getUser',
                  data: {
                      user_id: that.user
                  }
              }).then(function(res){
          
                
                  that.data = res.data
                  that.src = url+res.data.usersrc
              
                  
                  
                  
              })
    },
    denglu(){
      if(this.user == null){
        this.$router.push({name:'login'})
      }
    },onFileChange(e) {
  var files = e.target.files || e.dataTransfer.files;

  if (!files.length){
      return;
  }
  
   this.createImage(files[0]);
   
  },
  createImage(file) {
    var that = this

  
   let imgSize = file.size;
    if(imgSize < 1024 * 1024 *1){
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(event){
        let txt = event.target.result;
        that.src = txt
        that.upImg = true
      

      };
    } else {
      Toast({
        message: '图片必须小于1M',
        position: 'bottom',
        duration: 1000
    });   
    }
  },upImgs(){
     var that = this
           this.$ajax({
                  method: 'post',
                  url: url + 'upsrc',
                  data: {
                      user_id: that.user,
                      srcUp:that.src
                  }
              }).then(function(res){
          
                  console.log(res)
               

                if(res.data.status == '1'){
                      that.upImg = false
                       Toast({
                        message: '上传成功',
                        position: 'bottom',
                        duration: 1000
                    }); 
                }else{
                    Toast({
                        message: '上传失败',
                        position: 'bottom',
                        duration: 1000
                    }); 
                }
                  
                  
                  
              })
  },close(){
    
    this.user = null
    this.$router.push({name:'login'})
    localStorage.clear();
  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box{
  width: 100%;
  height: 100%;
}
.boxs{
   width: 100%;
  height: 100%;
}

.header_src{
  width: 100%;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  input{
    position: absolute;
    width: 30%;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translate(-50%,0);
   opacity: 0;

  }
  img{
     display: inline-block;
    width: 100px;
    height: 100px;
     border-radius: 50%;
  }
  
}
.close{
  width: 100%;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.box2{
  width: 100vw;
  height: 100vh;
  .box2bg{
      width: 100%;
      height: 100%;
  }
  .sli{
    width: 100%;
    height: 10rem;
  
    position: absolute;
    top: 60%;
    .slis{
      height: 80%;
      overflow-x: auto;
    
      .slis1{
        height: 4rem;
        white-space:nowrap;
        
        li{
          display: inline-block;
          height: 80%;
          box-sizing: border-box;
          padding: 1rem;
          border: 1px solid #dddddd;
          border-radius: 30px;
          margin-left: 30px;
          &:first-child{
            margin-left: 20px;
          }
          background: #ffffff;
        }
      }
       .slis2{
        height: 4rem;
          white-space:nowrap;
         
        li{
          box-sizing: border-box;
          padding: 1rem;
          display: inline-block;
          height: 80%;
          border: 1px solid #dddddd;
          border-radius: 30px;
          margin-left: 30px;
        background: #ffffff;
             &:first-child{
            margin-left: 50px;
          }
        }
      }
    }
  
  }
}

.box1{
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  //  padding-top: 40px;
  .box1bg{
    width: 100%;
    height: 100%;
  }
  .list{
    width: 100%;
  
    padding: 2px;
    box-sizing: border-box;
    text-align: center;
    position: absolute;
    li{
     display: inline-block;
      padding: 2px;
      width: 50%;
      position: relative;
      margin-top: 40px;
      h4{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        color: #ffffff;
        font-size: 20px;
      }
      img{
       border-radius: 50%;
        width: 100%;
      }
    }
  }
}

    
</style>
