<template>
 
 <div class="box">  
     <mt-header class="heards" fixed  title="万人聊天房">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="chatBox">
            <div class="boxin" id="chatwar">
                <div id = "chatContainer">
                    <p>{{time}}</p>
                <ul v-for="item in list">
                     <li class="chat_right"  v-if="item.name == name">
                        <div>
                              {{item.name}}   
                        </div>
                        <div>
                            {{item.content}}        
                        </div>
                    </li>
                    <li class="chat_left" v-else>
                        <div>
                              {{item.name}}  
                        </div>
                        <div>
                           {{item.content}}    
                        </div>
                    </li>
                  
                </ul>
            </div>
            </div>
            <div class="foots">
              <input type="text" v-model="data">
        
              <div class="sendW"> 
                    <mt-button type="default" class="send"  @click.native=" data == '' ? '' : send()">发送</mt-button>  
              </div>
                
            </div>
    </div>
       
  </div>  



</template>

<script>


 import { Toast } from 'mint-ui'
export default {

  data () {
    return {
        socket:'',
        data:'',
        list:[],
        name:'',
        time:''

    }
  }, beforeRouteEnter(to, from, next) {
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
      this.socket = io.connect('http://139.224.227.124:3000');
        this.name =localStorage.getItem('name')

        
        this.time = this.getNowFormatDate()
        
  },mounted(){
      
  },methods:{
      register(){
          this.$router.push({name:'register'})
      },
      send(){
          var datas = {name:this.name,content:this.data}
        this.socket.emit('liaotian', datas)
        this.data = ''
       
      }, getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                        + " " + date.getHours() + seperator2 + date.getMinutes()
                        + seperator2 + date.getSeconds();
                return currentdate;
            }
  },mounted(){
     var that = this
    this.socket.on('huifu', function(msg) {
                  that.list.push(msg)
                  
            })
  },watch: {
    list() {
        
        this.$nextTick(() => {
            var chatwar = this.$el.querySelector("#chatwar");
            chatwar.scrollTop = chatwar.scrollHeight;
      })

     }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    
    .box{
        width: 100%;
        height: 100vh;
        padding-top: 40px;
        box-sizing: border-box;
        .chatBox{
            width: 100%;
            height: 100%;
           
            .boxin{
                width: 100%;
                height: 90%;
                overflow-y: auto;
                 background: #f5f5f5;
                 p{
                     text-align: center;
                 }
                ul{
                    padding: 0 1rem;
                    margin-bottom: 1rem;
                    box-sizing: border-box;
                    width: 100%
                    li{
                        width: 100%;
                    
                    }
                    div{
                         
                    color:#2c3e50;
                        
                    }
                    .chat_left{
                        div:last-child{
                            margin-left: 10px;
                            background: #ffffff;
                            display: inline-block;
                            padding: 0.5rem;
                            font-size: 14px;
                            border-radius: 10px;
                            margin-top: 5px;
                               max-width: 70%;
                               word-wrap:break-word;
                        }
                    }
                        
                    
                    .chat_right{

                        text-align: right;
                          div:last-child{
                            margin-right: 10px;
                            background: #ffffff;
                            display: inline-block;
                            padding: 0.5rem;
                            font-size: 14px;
                            border-radius: 10px;
                            margin-top: 5px;
                            max-width: 70%;
                            word-wrap:break-word;
                            text-align: left;
                            
                        }
                    }
                }
            }
            .foots{
                width: 100%;
                height: 40px;
                box-sizing: border-box;
                padding: 0.4rem;
                display: flex;
                input{
                    height: 100%;
                    border-radius: 10px;
                    padding: 0.3rem;
                    flex: 1;
                   background:none;  
                    outline:none;  
                    border: 1px solid #dddddd;
                    margin-top: 2px;
                    
                    
                }
                .sendW{
                    
                    flex: 0 0 20%;
                     padding-left: 1rem;
                    .send{
                        text-align: right;
                       
                    }
                }
                
            }
        }
    }
    
</style>
