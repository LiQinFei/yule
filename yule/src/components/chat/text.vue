<template>
  <div>
    
      <mt-header class="heards">
      
          <mt-button icon="back" slot="left" @click="back">返回</mt-button>
      
      </mt-header>
      
         

         <div class="imgs">
           <div>
                <img :src="src" alt="">
           </div>
           
           <div>
                <input type="file" @change="onFileChange" accept="image/*" >
                 <mt-button type="default" class="buts">选择图片</mt-button>
           </div>
           
         </div>
      <mt-field label="标题" placeholder="5个字之内" v-model="textname"></mt-field>
     <mt-field label="介绍" placeholder="10个字之内" v-model="texttro"></mt-field>
    
   
   
      <mt-field label="内容" placeholder="请输入内容" type="textarea" rows="10" v-model="contents"></mt-field>

      <div class="tijiao">
          <mt-button type="default" size="large"  @click.native="sendText">发表</mt-button>   
         

      </div>

       
  </div>
</template>

<script>
 import { Indicator } from 'mint-ui'
 import { Toast } from 'mint-ui'
export default {
  data(){
    return {
      textname:'',
      texttro:'',
      contents:'',
      src:'',
      user_id:''
    }
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
         this.user_id = localStorage.getItem("user_id")
       
        },methods:{
        
         back(){
           this.$router.back(-1)
         },sendText(){
             var that = this
             
             if(this.textname == '' || this.texttro == '' || this.contents == ''|| this.src == '' || this.textname.length >5 || this.texttro.length>10){
                  Toast({
                      message: '你输入的有误',
                      position: 'bottom',
                      duration: 2000
                  });   
             }else{
                      Indicator.open()

                this.$ajax({
                    method: 'post',
                    url: url+'publish',
                    data: {
                        title: this.textname,
                        introduction:this.texttro,
                        content:this.contents,
                        src:this.src,
                        user_id:this.user_id
                    }
                }).then(function(res){
                        Indicator.close()

                    if(res.data.status == '1'){
                        Toast({
                          message: '发表成功',
                          position: 'bottom',
                          duration: 1000
                      }); 
                        that.$router.push({name:'share'})
                    }else{
                        Toast({
                          message: '发表失败',
                          position: 'bottom',
                          duration: 1000
                      }); 
                    }
                  
                })
             }
             
         }
         ,onFileChange(e) {
          var files = e.target.files || e.dataTransfer.files;

          if (!files.length){
              return;
          }
          
          this.createImage(files[0]);
          
          },
          createImage(file) {
            var that = this

          let imgSize = file.size;
            if(imgSize < 1024 * 1024 *2){
              let reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function(event){
                let txt = event.target.result;
                that.src = txt
              
              

              };
            } else {
              Toast({
                message: '图片必须小于2M',
                position: 'bottom',
                duration: 1000
            });   
            }
          }
        }

}
</script>

<style scoped lang="scss">

  .tijiao{
    padding: 1rem;
    box-sizing: border-box;
  }
  .imgs{
 
    width: 100%;
 
      text-align: center;
  div{
  
    &:first-child{
      display: inline-block;
      width: 5rem;
      padding: 0.1rem;
      box-sizing: border-box;
      height: 5rem;
      border: 1px solid #dddddd;
      margin-top: 1rem;
    img{
      width: 100%;
      height: 100%;
    }
      
    }
    &:last-child{
      height: 3rem;
     padding-left: 1rem;
      box-sizing: border-box;
      position: relative;
      margin: 0.5rem 0;

      input{
        position: absolute;
        z-index: 10;
        left: 50%;
        top: 50%;
         box-sizing: border-box;
        width: 40%;
       height: 100%;
        transform: translate(-50%,-50%);
        opacity: 0;
      }
      .buts{
        position: absolute;
        left: 50%;
        top: 50%;
        height: 2rem;
        transform: translate(-50%,-50%);
      }
    }
  }
  }
  
</style>
