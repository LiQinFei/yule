<template>
  <div class="allbox">
    <mt-header  class="heards">
      
          <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      
      </mt-header>
      <div class="title">
          <h2>{{data.songname}}</h2>
          <p>{{data.singername}}</p>
        </div>
               
        <div class="round" id="round">
         <img :src="data.albumpic_big" alt="">

        </div>
        {{lrc}}
    <div class="bofang">
          <audio :src="data.m4a" autoplay="autoplay" controls="controls"></audio>
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
        lrc:[]
    }
  },beforeCreate(){
        // Indicator.open()
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
           var id =  this.$route.params
          
          this.data = JSON.parse(localStorage.getItem('dei'))
          this.sech()
        },
        
        methods:{
             sech(){
               
                var that = this
              
              this.$ajax.get("http://route.showapi.com/213-2?showapi_appid=27325&showapi_sign=0143f400b1ff4923bc9dc25a40b55370&musicid="+that.data.songid)
                .then(function (response) {
                
                  if( response.data.showapi_res_code == 0){
                            var lrcStr = response.data.showapi_res_body.lyric 
                      // that.data = that.data.concat(response.data.showapi_res_body.pagebean.contentlist) 
                           
                         that.parseLyric(lrcStr)
                  }else{
                         Toast({
                        message: '请求失败',
                        position: 'bottom',
                        duration: 2000
                    });   
                  }
                })
            
              },back(){
               this.$router.back(-1)
            },parseLyric(lrc) {
               
              　　var t = document.createElement("div"); 
                t.innerHTML = lrc; 
                var str = t.textContent || t.innerText;
                
              var lyrics = str.split("\n");
              var lrcObj = {};
              for(var i=0;i<lyrics.length;i++){
                  var lyric = decodeURIComponent(lyrics[i]);
                  var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
                  var timeRegExpArr = lyric.match(timeReg);
                  if(!timeRegExpArr)continue;
                  var clause = lyric.replace(timeReg,'');
                  for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                      var t = timeRegExpArr[k];
                      var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                          sec = Number(String(t.match(/\:\d*/i)).slice(1));
                      var time = min * 60 + sec;
                      lrcObj[time] = clause;
                  }
              }
                this.lrc = lrcObj
                
          }
        },mounted(){
             var box = this.$el.querySelector("#round")
             var n = 0
             setInterval(function(){
                n+=0.5
                box.style.transform = 'rotate('+n+'deg)'
                if(n == 720){
                  n = 0
                }
             },50)
              
        }
}
</script>
<style scoped lang="scss">
.allbox{  

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .round{
    position: absolute;
    left: 50%;
    top: 40%;
    width: 70%;
    border-radius: 50%;
    margin-left: -35%;
    margin-top:-6rem;
    overflow: hidden;
    
    
    img{
      width: 100%;
    border-radius: 50%;
      
    }

  }

  .bofang{
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 1rem;

    audio{
        
      }
  }
    .title{
      width: 100%;
      text-align: center;
      h2{
        margin: 0.5rem 0;
      }
    }
}
  
</style>
