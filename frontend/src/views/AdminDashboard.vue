<template>
  <div class="min-h-screen bg-gray-100 p-6 pt-24">
    <h1 class="text-3xl font-semibold mb-6">Admin Dashboard</h1>

    <!-- Home Page Card -->
    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
      <h2 class="text-xl font-bold mb-2">Home Page</h2>
      <p class="text-sm text-gray-600">Manage homepage content</p>
      <button 
        @click="openModal" 
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Edit Homepage
      </button>
    </div>  

    <!-- Full-Screen Responsive Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-20">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-[90vh] overflow-auto">
        <h2 class="text-3xl font-semibold mb-4 text-center">Edit Homepage</h2>

        <!-- Title Input -->
        <div class="mb-4">
          <label class="block text-lg font-semibold">Title</label>
          <input v-model="form.title" type="text" class="w-full px-4 py-3 border rounded-lg text-lg" />
        </div>

        <!-- Description Input -->
        <div class="mb-4">
          <label class="block text-lg font-semibold">Description</label>
          <textarea v-model="form.description" class="w-full px-4 py-3 border rounded-lg text-lg"></textarea>
        </div>

        <!-- Image Upload or URL -->
        <div v-for="(image, index) in images" :key="index" class="mb-4">
          <label class="block text-lg font-semibold">Image {{ index + 1 }}</label>
          <input v-model="form[image]" type="text" class="w-full px-4 py-3 border rounded-lg text-lg mb-2" />
          <input type="file" @change="uploadImage($event, image)" class="w-full p-2 border rounded-lg" />
        </div>

        <!-- Buttons -->
        <div class="flex justify-between mt-6">
          <button @click="closeModal" class="px-6 py-3 bg-gray-400 text-white text-lg rounded-lg">
            Cancel
          </button>
          <button @click="saveChanges" class="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isModalOpen: false,
      form: {
        title: "",
        description: "",
        image1: "",
        image2: "",
        image3: "",
      },
      images: ["image1", "image2", "image3"], // Array for easier image mapping
    };
  },
  async mounted() {
    await this.fetchHomepageData();
  },
  methods: {
    async fetchHomepageData() {
      try {
        const response = await axios.get("http://localhost:5000/api/homepage");
        if (response.data && response.data.content) {
          this.form = { ...response.data.content };
        }
      } catch (error) {
        console.error("❌ Error fetching homepage data:", error);
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async saveChanges() {
      try {
        await axios.put("http://localhost:5000/api/homepage", this.form);
        alert("✅ Homepage updated successfully!");
        this.closeModal();
      } catch (error) {
        console.error("❌ Error updating homepage:", error);
      }
    },
    uploadImage(event, key) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.form[key] = reader.result; // Convert image to Base64 URL
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
