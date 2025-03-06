<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const error = ref(null);
const loading = ref(true);

// Fetch the product details from API
const fetchProduct = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/products`);
    if (!response.ok) throw new Error("Failed to fetch product data");

    const products = await response.json();
    product.value = products.find(p => p.name === decodeURIComponent(route.params.name));

    if (!product.value) throw new Error("Product not found");
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// Go back to product list
const goBack = () => {
  router.push("/products");
};

onMounted(fetchProduct);
</script>

<template>
  <div class="min-h-screen bg-white py-16 mt-20">
    <div class="container mx-auto px-6 md:px-12 lg:px-24">
      <!-- Loading -->
      <div v-if="loading" class="text-center text-lg font-semibold text-gray-600">Loading product...</div>

      <!-- Error -->
      <div v-if="error" class="text-center text-red-500 font-semibold">{{ error }}</div>

      <!-- Product Details -->
      <div v-if="product">
        <button @click="goBack" class="text-blue-600 font-medium hover:underline mb-6">← Back to Products</button>

        <h1 class="text-4xl font-bold text-gray-900 uppercase">{{ product.name }}</h1>
        <p class="text-gray-600 mt-2 text-lg">{{ product.description }}</p>
        <p class="text-gray-500 mt-1"><strong>Size:</strong> {{ product.size }}</p>
        <p class="text-gray-500"><strong>Type:</strong> {{ product.type }}</p>

        <!-- Image Slider -->
        <div class="mt-6">
          <div class="relative w-full max-w-4xl mx-auto">
            <img :src="product.images[0]" :alt="product.name" class="w-full h-auto object-cover rounded-lg shadow-lg">
          </div>

          <!-- Thumbnails -->
          <div class="flex space-x-4 mt-4 overflow-x-auto">
            <img 
              v-for="(img, index) in product.images" 
              :key="index" 
              :src="img" 
              :alt="`Image ${index + 1}`"
              class="w-24 h-24 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500"
              @click="product.images.unshift(product.images.splice(index, 1)[0])"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional styling for thumbnail images */
</style>
