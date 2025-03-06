<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const error = ref(null);
const loading = ref(true);
const selectedImage = ref(""); // ✅ Ensure the main image is set

// Fetch the product details from API
const fetchProduct = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/products`);
    if (!response.ok) throw new Error("Failed to fetch product data");

    const products = await response.json();
    product.value = products.find(p => p.name === decodeURIComponent(route.params.name));

    if (!product.value) throw new Error("Product not found");

    selectedImage.value = product.value.images[0]; // ✅ Set the first image as the default main image
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
      <div v-if="product" class="flex flex-col md:flex-row">
        <!-- Text Section (Left) -->
        <div class="md:w-1/2 text-left">
          <button @click="goBack" class="text-blue-600 font-medium hover:underline mb-4">← Back to Products</button>

          <h1 class="text-4xl font-bold text-gray-900 uppercase">{{ product.name }}</h1>
          <p class="text-gray-600 mt-2 text-lg">{{ product.description }}</p>
          <p class="text-gray-500 mt-1"><strong>Size:</strong> {{ product.size }}</p>
          <p class="text-gray-500"><strong>Type:</strong> {{ product.type }}</p>

          <!-- Thumbnails (Moved Under Text) -->
          <div class="flex justify-start space-x-2 mt-6">
            <img 
              v-for="(img, index) in product.images" 
              :key="index" 
              :src="img" 
              :alt="`Image ${index + 1}`"
              class="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition"
              :class="{'border-blue-500': selectedImage === img, 'border-transparent': selectedImage !== img}"
              @click="selectedImage = img"
            />
          </div>
        </div>

        <!-- Image Section (Right) -->
        <div class="md:w-1/2 flex flex-col items-center">
          <!-- ✅ Main Image -->
          <div class="relative w-full max-w-md mx-auto">
            <img :src="selectedImage" :alt="product.name" class="w-full h-auto object-cover rounded-lg shadow-lg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* Optional: Ensure the image stays proportionate */
img {
  transition: all 0.3s ease-in-out;
}
</style>
