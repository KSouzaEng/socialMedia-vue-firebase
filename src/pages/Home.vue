<template>
  <div id="home">
    <div class="newpost">
    <h2>Bem Vindo de Volta</h2>
    <span>Compartilhe seu dia</span>
    <textarea 
    placeholder="O que está fazendo hoje"
    rows="15"
    v-model="input"
    >
    </textarea>
    <button @click="createPost()">Compartilhar</button>
    </div>
    <div class="postarea" v-if="loading">
    <h2>Buscando posts.....</h2>
    </div>
    <div class="postarea" v-else>
    <article class="post">
    <h1>Matheus</h1>
    <p>Olaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
    <div class="action-post">
    <button>20 curtidas</button>
    <button>Veja o post Completo</button>
    </div>
    </article>
    </div>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection'
export default {
  name: 'Home',
  components: {
    
  
  },
  data(){
    return{
      input: '',
      user:{},
      loading:true,
      posts:[]
    }
  },
 async created(){
    const user = localStorage.getItem('devPost');
    this.user = JSON.parse(user)
    await firebase.firestore().collection('posts')
    .onSnapshot((doc)=> {
      this.posts = []
      doc.forEach((item)=> {
        this.posts.push({
        id:item.id,
        autor:item.data().autor,
        content:item.data().content,
        likes:item.data().likes,
        created:item.data().created,
        userId:item.data().userId
        })
      })
      this.loading = false
      console.log(this.posts)
    })
  },
  methods:{
    async createPost(){
      if(this.input === ''){
        return;
      }
      await firebase.firestore().collection('posts')
      .add({
        created: new Date(),
        content: this.input,
        autor:this.user.nome,
        userId:this.user.uid,
        likes:0
      })
      .then(() => {
        this.input = ''
       window.confirm("POST CRIADO COM SUCESSO")
      })
      .catch((error) => {
        window.confirm("Erro ao criar o post"+error)
      })
    }
  }
}
</script>

<style scoped>
#home {
 display: flex;
 flex-direction: row;
 margin: 25px;
}
@import './home.css';
</style>
