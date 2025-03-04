<template>
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto py-12 px-6">
        <h1 class="text-4xl font-bold text-gray-800 text-center mb-8">Our Services</h1>
        <p class="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          We offer a range of architectural and design services tailored to meet your needs. From concept design to full project execution, we create spaces that inspire.
        </p>
  
        <!-- Service Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(service, index) in services" :key="index" class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex items-center justify-center">
              <img :src="service.icon" :alt="service.name" class="w-16 h-16 mb-4">
            </div>
            <h2 class="text-2xl font-semibold text-gray-800 text-center">{{ service.name }}</h2>
            <p class="text-gray-600 mt-2 text-center">{{ service.description }}</p>
            <router-link to="/contact" class="mt-4 block text-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Get in Touch
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
        services: [
          { 
            name: "Architectural Design", 
            description: "Conceptual and structural designs tailored to your vision.", 
            icon: "https://img.icons8.com/ios-filled/100/000000/architecture.png"
          },
          { 
            name: "Interior Design", 
            description: "Creating stylish and functional interior spaces.", 
            icon: "https://img.icons8.com/ios-filled/100/000000/interior.png"
          },
          { 
            name: "Landscape Planning", 
            description: "Designing beautiful outdoor environments for homes and businesses.", 
            icon: "https://img.icons8.com/ios-filled/100/000000/garden.png"
          },
          { 
            name: "Project Management", 
            description: "Supervising and ensuring smooth project execution.", 
            icon: "https://img.icons8.com/ios-filled/100/000000/maintenance.png"
          },
          { 
            name: "Sustainable Architecture", 
            description: "Eco-friendly and energy-efficient building solutions.", 
            icon: "https://img.icons8.com/ios-filled/100/000000/green-energy.png"
          },
          { 
            name: "3D Rendering & Visualization", 
            description: "High-quality 3D models and visual presentations.", 
            icon: "https://img.icons8.com/ios-filled/100/000000/3d-model.png"
          }
        ]
      };
    }
  };
  </script>
  