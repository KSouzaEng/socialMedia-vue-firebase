<template>
  <div id="perfil">
      <div class="postarea loading" v-if="loading">
        <h2>Buscando posts...</h2>
      </div>

      <div v-else>
        <div class="headerPerfil">
          <h2>Olá {{nome}}</h2>
          <span>Já fez <strong>{{this.posts.length}}</strong> posts</span>
        </div>

        <div class="postarea">
          <article class="post" v-for="post in posts" :key="post.id">
            <h1>{{post.autor}}</h1>
            <p>
              {{post.content | postLength}}
            </p>
            <div class="action-post">
              <button @click="togglePostModal(post)">Veja post completo</button>
            </div>
          </article>
        </div>
      </div>

      <Modal
        v-if="showPostModal"
        :post="fullPost"
        @close="togglePostModal()"
      >

      </Modal>

  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';
import Modal from '../components/Modal';

export default {
  name: 'Perfil',
  components:{
    Modal
  },
  data(){
    return{
      loading: true,
      showPostModal: false,
      fullPost: {},
      posts: [],
      nome: '',
      user: {}
    }
  },
  props:['userid'],
  async created(){
    const user = localStorage.getItem('devpost');
    this.user = JSON.parse(user);
    console.log(this.userid)

    await firebase.firestore().collection('posts')
    .where('userId', '==', this.userid)
    .orderBy('created', 'desc')
    .onSnapshot((snapshot)=>{
      this.posts = [];

      snapshot.forEach((doc)=>{
        this.posts.push({
          id: doc.id,
          autor: doc.data().autor,
          content: doc.data().content,
          likes: doc.data().likes,
          created: doc.data().created,
          userId: doc.data().userId
        });
      })

      this.nome = this.posts[0].autor;
      this.loading = false;    
    })
    



  },
  methods:{
    togglePostModal(post){
      this.showPostModal = !this.showPostModal;

      if(this.showPostModal){
        this.fullPost = post;
      }else{
        this.fullPost = {};
      }

    }
  },
  filters:{
    postLength(valor){
      if(valor.length < 200){
        return valor;
      }

      return `${valor.substring(0, 200)}...`
    }
  }

}
</script>

<style scoped>

</style>
