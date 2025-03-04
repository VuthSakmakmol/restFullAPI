<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-3xl font-bold text-gray-800 mb-4 text-center">Contact Us</h2>
        <p class="text-gray-600 text-center mb-6">
          Fill out the form below and we’ll get back to you as soon as possible.
        </p>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label class="block text-gray-700 font-medium">Name</label>
            <input v-model="name" type="text" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Name" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-medium">Email</label>
            <input v-model="email" type="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Email" required />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-medium">Message</label>
            <textarea v-model="message" rows="4" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>
        <p v-if="successMessage" class="mt-4 text-green-600 text-center">{{ successMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "",
        email: "",
        message: "",
        successMessage: "",
      };
    },
    methods: {
      submitForm() {
        // Simulating a form submission (you can later replace this with an API call)
        this.successMessage = "Your message has been sent successfully!";
        
        // Clear form fields
        this.name = "";
        this.email = "";
        this.message = "";
      },
    },
  };
  </script>
  