  <!-- eslint-disable no-undef -->
  <!-- eslint-disable no-unused-vars -->
  

  <script setup>
    import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore'
    import { reactive, ref, onMounted } from 'vue'
    import '@radix-ui/themes/styles.css';
    import db from './db';
    
    import DashboardHome from './components/DashboardHome.vue'
    import DashboardChat from './components/DashboardCHat.vue'
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


    <div v-else class="bg-gray-900 h-[10vh]">

      <DashboardChat />
      <header class="bg-gray-900 py-4 px-6 flex items-center justify-between pb-10">
          <div class="text-white text-center sm:text-left flex-grow flex flex-col">
          <!-- <p class="text-center items-center sm:text-left flex-grow-1">MooChat</p> -->
          <p class="flex flex-col"><span class="text-lg">Welcome,</span><span class="text-5xl italic">{{ state.username }}</span></p>
        </div>
          <button @click="logout" class="ml-auto rounded-md bg-red-800 sm:px-4 py-1 text-base sm:text-lg font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Logout</button>
      </header>


        <div class="bg-gray-900 h-[71.7vh]">
          <section class="bg-gray-700 chat-box">
            <div v-for="message in state.messages" :key="message.id" :class="(message.username == state.username ? 'message current-user' : 'message')">
              <div class="message-inner">
                <div class="username">{{ message.username }}</div>
                <div class="content">{{ message.content }}</div>
              </div>
            </div>
          </section>
        

          <footer class="bg-gray-800">
            <form @submit.prevent="sendMessage">
              <input type="text" placeholder="Write your moo-ssage..." v-model="messageInput"/>
              <input type="submit" value="Send Message"/>
            </form>
          </footer>
        </div>
        <!-- <Modal/> -->
        <Testimonial/>

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

  .chat-box {
    border-radius: 24px 24px 0 0;
    /* background-color: #FFF; */
    box-shadow: 0px 0px 10px rgba(100, 100, 100, 0.2);
    flex: 1 1 100%;
    padding: 30px;
    width: 80vw;
    height: 50vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  /* Add scrollbar styling */
  .chat-box::-webkit-scrollbar {
    width: 10px;
  }

  .chat-box::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .chat-box::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  /* Handle scrollbar on hover */
  .chat-box::-webkit-scrollbar-thumb:hover {
    background-color: white;
  }

  .chat-box .message {
    display: flex;
    margin-bottom: 15px;
  }

  .chat-box .message .message-inner .username {
    color: #888;
    font-size: 16px;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
  }

  .chat-box .message .message-inner .content {
    display: inline-block;
    padding: 10px 20px;
    background-color: #F3F3F3;
    border-radius: 999px;
    color: #333;
    font-size: 18px;
    line-height: 1.2em;
    text-align: left;
  }

  .chat-box .message.current-user {
    margin-top: 5px;
    justify-content: flex-end;
    text-align: right;
  }

  .chat-box .message.current-user .message-inner .content {
    color: #FFF;
    font-weight: 400;
    background-color: rgb(31 41 55);
  }

  footer {
    position: sticky;
    bottom: 0px;
    padding: 30px;
    width: 80vw;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    border-radius: 0 0 24px 24px;
    box-shadow: 0px 0px 10px rgba(100, 100, 100, 0.2);
  }

  footer form {
    display: flex;
  }

  footer form input[type="text"] {
    flex: 1 1 100%;
    appearance: none;
    border: none;
    outline: none;
    background: none;
    display: block;
    width: 100%;
    height: 3rem;
    padding: 10px 15px;
    border-radius: 8px 0 0 8px;
    color: #333;
    font-size: 18px;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    background-color: #F3F3F3;
    transition: 0.4s;
  }

  footer form input[type="text"]::placeholder {
    color: #888;
    transition: 0.4s;
  }

  footer form input[type="submit"] {
    appearance: none;
    border: none;
    outline: none;
    background: none;
    display: block;
    border-radius: 0 8px 8px 0;
    background-color: rgb(9, 53, 124);
    border: 1px solid white;
    color: #FFF;
    font-weight: 500;

    /* Increase padding for medium screens (sm and up) */
    @media (min-width: 640px) {
      padding: 10px 20px;
      width: 10rem;
    }
  }

  footer form input[type="submit"]:hover{
    background-color: rgb(19, 80, 179);
    cursor: pointer;
  }

  </style>