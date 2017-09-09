<template>
  <div class="allbox">
     <mt-header fixed class="heards" title="我是诗人">
          <mt-button icon="back" @click="back" slot="left">返回</mt-button>
      </mt-header>
 <div class="boxs">
 
  
  
  <mt-cell class="selects" title="五言/七言">
    <select v-model="num">
      <option value="5" >五言</option>
      <option value="7">七言</option>
    </select>
  </mt-cell>
   <mt-cell class="selects" title="藏？">
    <select v-model="type">
      <option value="1">藏头</option>
      <option value="2">藏尾</option>
      <option value="3">藏中</option>
      <option value="4">递增</option>
      <option value="5">递减</option>
    </select>
  </mt-cell>
    <mt-cell class="selects" title="押韵">
    <select v-model="yayuntype">
      <option value="1">双句一压</option>
      <option value="2">双句押韵</option>
      <option value="3">一三四押</option>
    </select>
  </mt-cell>
      <mt-field class="keys" label="请输入关键字" placeholder="藏头诗中要包括的句子，最多八个子。" type="textarea" rows="3" v-model="key"></mt-field>


    <div class="gos_war">
    <mt-button class="gos" type="primary" @click="sech">生成</mt-button>

    </div>
    <div class="order">
      <p v-for=" (list,index) in data">
        {{index+1}}.{{list}}
      </p>
    </div>

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
      num:'5',
      type:'1',
      yayuntype:'1',
      key:''
     
    }
  },beforeCreate(){
      //  Indicator.open()
    }
    , updated(){
      Indicator.close()
       
    },beforeRouteEnter(to, from, next) {
      let oo = localStorage.getItem("user_id");
      console.log(22)
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
          // this.sech()
        },activated(){

        },
        
        methods:{
             sech(){


                var that = this
                if(that.key == ''){
                     Toast({
                        message: '请输入关键词',
                        position: 'bottom',
                        duration: 2000
                    }); 
                }else{
                            Indicator.open()
             var keys = encodeURIComponent(that.key)

              this.$ajax.get('http://route.showapi.com/950-1?showapi_appid=27325&showapi_sign=0143f400b1ff4923bc9dc25a40b55370&num='+that.num+'&type='+that.type+'&yayuntype='+that.yayuntype+'&key='+keys)
                .then(function (response) {
                  Indicator.close()
                 
                  if( response.data.showapi_res_code == 0){
                          
                       that.data = response.data.showapi_res_body.list  
                  
                      
                  }else{
                         Toast({
                        message: '生成失败',
                        position: 'bottom',
                        duration: 2000
                    });   
                  }
                })
                }
          
            
              },back(){
               this.$router.back(-1)
            } 
        }
}
</script>
<style scoped lang="scss">
.allbox{  
  padding-top: 40px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
.boxs{
  width: 100%;
  height: 100%;

  box-sizing: border-box;
 overflow: auto;

  .selects{
      select{
        width: 10rem;
        height: 40px;
      }
  }
.keys{
  margin-top: 10px;
  // border-top: 1px solid #dddddd;
}
.gos_war{
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  .gos{
    border-radius: 50%;
    display: inline-block;
    width: 5rem;
    height:5rem;
  }
}
.order{
  width: 100%;

  background: #f1fafa;
  margin-top: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  p{
    font-size: 1.4rem;
    margin-bottom: 5px;
  }
}
}
}
  
</style>
