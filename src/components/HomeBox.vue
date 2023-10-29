<template>
    <div class="relative isolate overflow-hidden h-[100vh] bg-gray-900 py-12 sm:py-32 pl-16">
      <!-- <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt="" class="absolute inset-0 -z-10 h-52 w-full object-cover object-right md:object-center" /> -->
      <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
        <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
        <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="mx-auto max-w-7xl">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl italic">Join the rEVOLution</h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">At MooChat, conversations spark change. New ideas emerge and communities unite as users share and discuss what matters most to them. Join our community, share your voice, and help start something big.</p>
        </div>
      </div>
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 pt-24 pr-16">
          <div class="max-w-xl lg:max-w-lg">
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl italic">Subscribe to <span class="italic">mOO-sletter</span></h2>
            <p class="mt-4 text-lg leading-8 text-gray-300">Be the first to know when we release new MooChat features and updates! Subscribe now to our <span class="italic">moo-thly moo-sletter</span>.</p>
            <div class="mt-6 flex max-w-md gap-x-4">
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required="" class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Enter your email" />
              <button type="submit" @click="subscribeToNewsletter" class="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Subscribe</button>
            </div>
          </div>
          <dl class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div class="flex flex-col items-start">
              <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt class="mt-4 font-semibold text-white italic">Weekly articles</dt>
              <dd class="mt-2 leading-7 text-gray-400 w-[16rem]">Curated moos, once a week. The Moosletter delivers our favourite features and community stories to your inbox each week.</dd>
            </div>
            <div class="flex flex-col items-start">
              <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <dt class="mt-4 font-semibold text-white italic">No spam</dt>
              <dd class="mt-2 leading-7 text-gray-400 w-[16rem]">Get weekly moos, not daily spams. Subscribe to our no-spam Moosletter for the best of MooChat.</dd>
            </div>
          </dl>
        </div>
    </div>
  </template>
  
  <script setup>
  import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/vue/24/outline'
  import { collection, addDoc, getFirestore } from 'firebase/firestore'
  import { ref } from 'vue';

// Initialize an empty email variable
const email = ref('');

const subscribeToNewsletter = async () => {
  try {
    const db = getFirestore();
    const emailCollection = collection(db, 'subscribedEmails');

    await addDoc(emailCollection, {
      email: email.value,
    });
    email.value = '';

    console.log('Email subscribed successfully!');
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);

  }
};
  </script>