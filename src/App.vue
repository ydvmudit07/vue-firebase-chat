  <!-- eslint-disable no-undef -->
  <!-- eslint-disable no-unused-vars -->
  

  <script setup>
    import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
    import { reactive, ref, onMounted } from 'vue'
    import '@radix-ui/themes/styles.css';
    import db from './db';
    
    import DashboardHome from './components/DashboardHome.vue'
    import HomeBox from './components/HomeBox.vue'
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
      <DashboardHome/>
      <div class="bg-gray-900 w-full sm:h-[87vh] flex flex-col pl-4 sm:pl-16 pt-36 sm:pt-36">
        <div class="text-white text-2xl sm:text-4xl font-sans pb-2 text-left italic">
          <span class="font-thin italic">Welcome to</span><br>
          <span class="text-6xl sm:text-8xl font-semibold">MooChat</span>
          <div class="text-white text-lg sm:text-2xl text-thin pt-6 sm:pt-16 text-left">
            Chat with the MooSquad
          </div>
        </div>
        <form @submit.prevent="login" class="flex flex-col sm:flex-row w-[90vw] sm:w-[32.5rem] gap-2 sm:gap-5">
          <input id="email-address" v-model="usernameInput" type="text" autocomplete="name" required="" class="min-w-0 h-10 sm:h-12 flex-auto rounded-md border-0 bg-white/5 px-3 sm:px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-base sm:text-lg sm:leading-6" placeholder="Enter your username..." />
          <button type="submit" @click="login" class="flex-none rounded-md bg-indigo-500 px-3 sm:px-3.5 py-2.5 text-base sm:text-lg font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Let's Chat</button>
        </form>
        <div class="mt-16 sm:mt-32 flex justify-center"><img class="h-10 w-10 cursor-pointer bouncing-image" src="arrow.svg" @click="scrollToHeaderBox"/></div>
      </div>
      <HomeBox class="home-box"/> 
    </div>


    <!-- CHAT PAGE STARTS FROM HERE -->


    <div v-else>
        <header>
          <!-- <DashboardChat/> -->
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