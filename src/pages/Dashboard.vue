<template>
  <div id="dashboard">
  <h1>Minha Conta</h1>
  <span>Atualize seu perfil</span>
  <form @submit.prevent="updateProfile">
    <label >Nome:</label>
    <input type="text" v-model="nome" :placeholder="user.nome" id="name">
    <button class="button" type="submit">Atualizar Perfil</button>
      <button class="button logout" @click="logOut">Sair</button>
  </form>

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
      login:true,
      user:{}
    }
  },
  created(){
    const user = localStorage.getItem('devPost');
     this.user = JSON.parse(user);
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
  },
  async updateProfile(){
    if(this.nome === ''){
      return
    }
    await firebase.firestore().collection('users')
    .doc(this.user.uid).update({
      nome:this.nome
    })
    const postDocs = await firebase.firestore().collection('posts')
    .where('userId','==',this.user.uid).get()

    postDocs.forEach(async doc =>{
      await firebase.firestore().collection('posts').doc(doc.id).update({
        autor:this.nome
      })
    })
    localStorage.setItem('devPost',JSON.stringify({uid:this.user.uid,nome:this.nome}))
    alert("Perfil atualizado")
  }
  }
}
</script>

<style scoped>
#dashboard{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  padding: 15px 20px;
  max-width: 600px;
  background: #4c5059;
  box-shadow: rgba(0, 0, 0, 0.2);
}
h1{
color: #fff;
}
h2{
color: #fff;
}
span{
color: #FFF;
margin-bottom: 25px;
}
form{
width:500px;
display: flex;
flex-direction: column;
}
form label{
font-size: 18px;
color: #FFF;
padding-bottom: 5px;
}
form input{
height: 30px;
padding: 5px;
font-size: 17px;
border: 0;
outline: none;
margin-bottom: 5px;
background: #FAFAFA;
}
button{
cursor: pointer;
margin-top: 10px;
height: 35px;
border: 0;
background: #7289DA;
color: #FFF;
font-size: 17px;
}
 .logout{
width: 500px;
background: #E36D6D;
color: #FFF;
}
</style>
