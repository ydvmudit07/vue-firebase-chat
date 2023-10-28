  <!-- eslint-disable no-undef -->
  <!-- eslint-disable no-unused-vars -->
  

  <script setup>
    import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
    import { reactive, ref, onMounted } from 'vue'
    import '@radix-ui/themes/styles.css';
    import db from './db';
    
    import Dashboard from './components/Dashboard.vue'
    import HomeBox from './components/HomeBox.vue'
    import Newsletter from './components/Newsletter.vue';

    const usernameInput = ref("")
    const messageInput = ref("")
    const state = reactive({
        username: "",
        messages: []
    })

    const login = () => {
        if(usernameInput.value.trim() !== ""){
            state.username = usernameInput.value
            usernameInput.value = ''
        }
    }  

    const logout = () => {
        state.username = ''
    }

    const sendMessage = () => {
      const messagesRef = collection(db, "sentMessages");

      if (messageInput.value === '' || messageInput.value === null) {
        return
      }

      const message = {
        username: state.username,
        content: messageInput.value,
        sentAt: new Date()
      }

      messageInput.value = ''
      addDoc(messagesRef, message)
        .then(() => {
          messageInput.value = '';
        })
        .catch((error) => {
          console.error('Error adding message: ', error);
      });
    }

    onMounted(() => {
      const messagesRef = collection(db, 'sentMessages');
      const q = query(messagesRef, orderBy('sentAt', 'asc'));

      onSnapshot(q, (snapshot) => {
        const messages = [];
        snapshot.docs.forEach((doc) => {
          messages.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        state.messages = messages;
      });
    });

    const scrollToHeaderBox = () => {
      const headerBoxEl = document.querySelector('.home-box')
      if (headerBoxEl) {
        headerBoxEl.scrollIntoView({behavior: 'smooth'}) 
      }
    } 
  </script>


  <!-- HOME PAGE STARTS FROM HERE -->


  <template>
    <div v-if="state.username === '' || state.username === null">
      <Dashboard/>
      <div class="bg-gray-900 w-full h-[87vh] flex flex-col pl-16 pt-36">
          <div class="text-white text-4xl font-sans pb-2 text-left italic">
            <span class=" font-thin italic">Welcome to</span><br>
            <span class="text-8xl font-semibold">MooChat</span>
            <div class="text-white text-2xl text-thin pt-16 text-left">
              Chat with the MooSquad
            </div>
          </div>
        <form @submit.prevent="login" class="flex flex-row">
          <input v-model="usernameInput" placeholder="Enter your username..." type="text" class="bg-gray-900 w-64 h-10 text-white border-gray-300 rounded-lg rounded-r-none"/>
          <input class="text-white h-10 w-36 border rounded-r-lg border-gray-300" type="submit" value="Let's Chat" @click="login"/>
        </form>
        <div class="mt-32 flex justify-center"><img class="h-10 w-10 cursor-pointer bouncing-image" src="arrow.svg" @click="scrollToHeaderBox"/></div>
      </div>
      <HomeBox class="home-box"/> 
    </div>


    <!-- CHAT PAGE STARTS FROM HERE -->


    <div v-else>
        <header>
          <p>MooChat</p>
          <p>Hello, {{ state.username }}</p>
          <button @click="logout">Logout</button>
        </header><br>

        <section>
          <div v-for="message in state.messages" :key="message.id" :class="(message.username == state.username ? 'message current-user' : 'message')">
            <div>{{ message.username }}</div>
            <div>{{ message.content }}</div>
          </div>
        </section>

        <footer>
          <form @submit.prevent="sendMessage">
            <input type="text" v-model="messageInput"/>
            <input type="submit" value="Send Message"/>
          </form>
        </footer>
    </div>
  </template>

  <style scoped>
  .bouncing-image {
      transition: transform 0.2s ease;
    }

    .bouncing-image:hover {
      animation: bounce 0.5s infinite;
    }

    @keyframes bounce {
      0%, 10%, 20%, 50%, 65%, 80%, 90%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
  </style>