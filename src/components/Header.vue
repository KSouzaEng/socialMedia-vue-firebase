<template>
  <header id="header">
   <router-link to="/">Sujeito Post</router-link>
      <router-link to="/dashboard" tag="button">Dashboard Post</router-link>
    
  </header>
</template>

<script>


export default {
  name: 'Header',
  components: {
  
  }
}
</script>

<style scoped>
#header{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 60px;
    background-color: #202225;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
}
#header a {
    text-decoration: none;
    font-size: 30px;
    color: #FFF;
    cursor: pointer;
    font-weight: bold;
}
button{
    cursor: pointer;
    border: 0;
    color: #FFF;
    background: transparent;
    padding: 5px 15px;
    outline: none;
    font-weight: bold;
}
</style>
