<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
        <div v-for="(faq, index) in faqs" :key="index" class="mb-4">
          <button @click="toggleFAQ(index)" class="w-full text-left bg-gray-200 px-4 py-3 rounded-lg flex justify-between items-center">
            <span class="font-medium text-gray-700">{{ faq.question }}</span>
            <span class="text-gray-500">{{ activeIndex === index ? '−' : '+' }}</span>
          </button>
          <div v-if="activeIndex === index" class="mt-2 px-4 py-3 bg-gray-50 rounded-lg">
            <p class="text-gray-600">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeIndex: null,
        faqs: [
          { question: "What services do you offer?", answer: "We provide web development, API integration, and custom software solutions." },
          { question: "How can I contact support?", answer: "You can reach us via the contact page or email us at support@example.com." },
          { question: "Do you offer free trials?", answer: "Yes, we offer a 7-day free trial for our premium services." },
          { question: "Can I customize my project requirements?", answer: "Absolutely! We provide tailored solutions based on your needs." }
        ]
      };
    },
    methods: {
      toggleFAQ(index) {
        this.activeIndex = this.activeIndex === index ? null : index;
      }
    }
  };
  </script>
  