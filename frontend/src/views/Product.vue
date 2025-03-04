<template>
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto py-12 px-6">
        <h1 class="text-4xl font-bold text-gray-800 text-center mb-8">Our Architectural Styles</h1>
        <p class="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Explore our unique architectural designs. We specialize in creating modern, traditional, and innovative spaces that inspire.
        </p>
  
        <!-- Product Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(style, index) in architectureStyles" :key="index" class="bg-white p-6 rounded-lg shadow-lg">
            <img :src="style.image" :alt="style.name" class="w-full h-56 object-cover rounded-lg mb-4">
            <h2 class="text-2xl font-semibold text-gray-800">{{ style.name }}</h2>
            <p class="text-gray-600 mt-2">{{ style.description }}</p>
            <router-link to="/contact" class="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Contact Us
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        architectureStyles: [
          { 
            name: "Modern Minimalist", 
            description: "Clean lines, open spaces, and natural light define this style.", 
            image: "https://source.unsplash.com/500x300/?modern-architecture"
          },
          { 
            name: "Traditional Classic", 
            description: "Timeless elegance with rich details and refined craftsmanship.", 
            image: "https://source.unsplash.com/500x300/?classic-architecture"
          },
          { 
            name: "Industrial Loft", 
            description: "Exposed brick, metal accents, and open floor plans for urban living.", 
            image: "https://source.unsplash.com/500x300/?industrial-architecture"
          },
          { 
            name: "Futuristic Concept", 
            description: "Bold, innovative, and forward-thinking architectural designs.", 
            image: "https://source.unsplash.com/500x300/?futuristic-architecture"
          },
          { 
            name: "Eco-Friendly Green", 
            description: "Sustainable materials, energy efficiency, and harmony with nature.", 
            image: "https://source.unsplash.com/500x300/?eco-architecture"
          },
          { 
            name: "Japanese Zen", 
            description: "Minimalist, serene spaces with natural elements and balance.", 
            image: "https://source.unsplash.com/500x300/?japanese-architecture"
          }
        ]
      };
    }
  };
  </script>
  