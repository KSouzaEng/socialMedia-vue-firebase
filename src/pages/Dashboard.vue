<template>
  <div id="dashboard">
  <h1>Dashboard</h1>
  <button @click="logOut">Sair</button>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection'
export default {
  name: 'Dashboard',
  data(){
    return{
      nome: '',
      email: '',
      password: '',
      login:true
    }
  },
  methods:{
  
    async logOut(){
    const confirm = window.confirm("Você deseja realmente sair")
    if(confirm){
      await firebase.auth().signOut()
      .then(async () => {
        await localStorage.removeItem('devPost')
        this.$router.push('/login')
      })
    }else{
      return
  }
  }
  }
}
</script>

<style scoped>
h1{
  text-align: center;
  color: #FFF;
}
.loginArea{
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  margin-top: 65px;
  max-width: 600px;
  background: #4c5059;
  border-radius: 5px;
}
form{
  display: flex;
  flex-direction: column;
  margin: 0 25px;

}
input{
  margin-bottom: 10px;
  height: 30px;
  width: 300px;
  font-size: 18px;
  padding: 10px;
  outline: none;
  border: 0;
  background: rgb(241, 241, 241);
}
button{
  height: 35px;
  border: 0;
  background-color: #7289DA;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  color: #FFF;
 
}
.loginArea a{
  margin-top: 20px;
  text-decoration: none;
  color: #FFF;
  cursor: pointer;
  text-align: center;
}

</style>
