  <!-- eslint-disable no-undef -->
  <!-- eslint-disable no-unused-vars -->
  

  <script setup>
    import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
    import db from './db';
    import { reactive, ref, onMounted } from 'vue'
    import '@radix-ui/themes/styles.css';
    
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
      const messagesRef = collection(db, "messages");

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
      const messagesRef = collection(db, 'messages');
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

  </script>

  <template>
    <div v-if="state.username === '' || state.username === null">
        <form @submit.prevent="login">
            <input v-model="usernameInput" type="text"/>
            <input type="submit" value="Submit" @click="login"/>
        </form>
    </div>
    <div v-else>
        <header>
          <h1>MooChat</h1>
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
  *{
    font-family: Arial, Helvetica, sans-serif;
  }
  </style>
