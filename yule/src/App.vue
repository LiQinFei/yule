<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  }

  .heards{
      background: #f03844 !important;
      font-size: 1rem;
      letter-spacing: 2px;
    }
  html,body{
    width: 100%;
    height: 100%;

    }
    

body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,form,fieldset,table,td,img,div{margin:0;padding:0;border:0;} 

 
ul,ol{list-style-type:none;} 
select,input,img,select{vertical-align:middle;} 
  a{
    text-decoration: none;
      margin: 0;
    padding: 0;

  }
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
