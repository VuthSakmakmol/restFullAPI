<template>
  <div class="min-h-screen bg-gray-100 p-6 pt-24">
    <h1 class="text-3xl font-semibold mb-6">Admin Dashboard</h1>

    <!-- ============================= -->
    <!-- HOME MANAGEMENT SECTION -->
    <!-- ============================= -->
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

    <!-- ============================= -->
    <!-- PRODUCT MANAGEMENT SECTION -->
    <!-- ============================= -->

    <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-6">
      <h2 class="text-xl font-bold mb-2">Products</h2>
      <p class="text-sm text-gray-600">Manage product details</p>
      <button 
        @click="openProductListModal" 
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Edit Products
      </button>
    </div>

    <!-- Product List Modal -->
    <div v-if="isProductListModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-20">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[90vh] overflow-auto">
        <h2 class="text-lg font-semibold mb-4 text-center">Edit Products</h2>

        <!-- Display All Products -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(product, index) in products" :key="index" class="bg-gray-100 p-3 rounded-lg shadow-md">
            <img :src="product.images[0]" :alt="product.name" class="w-full h-32 object-cover rounded-lg mb-2">
            <h3 class="text-sm font-semibold">{{ product.name }}</h3>
            <p class="text-xs text-gray-600">{{ product.description }}</p>
            <button 
              @click="selectProduct(product)" 
              class="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition"
            >
              Edit
            </button>
          </div>
        </div>

        <button @click="closeModals" class="mt-4 px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition">
          Close
        </button>
      </div>
    </div>

    <!-- Edit Product Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-20">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl h-[90vh] overflow-auto">
        <h2 class="text-lg font-semibold mb-4 text-center">Edit Product</h2>

        <div class="space-y-2">
          <label class="block text-sm font-semibold">Product Name:</label>
          <input v-model="selectedProduct.name" class="border p-2 w-full rounded-lg text-sm" />

          <label class="block text-sm font-semibold">Description:</label>
          <textarea v-model="selectedProduct.description" class="border p-2 w-full rounded-lg text-sm"></textarea>

          <label class="block text-sm font-semibold">Size:</label>
          <input v-model="selectedProduct.size" class="border p-2 w-full rounded-lg text-sm" />

          <label class="block text-sm font-semibold">Type:</label>
          <input v-model="selectedProduct.type" class="border p-2 w-full rounded-lg text-sm" />

          
          <label class="block text-sm font-semibold">Images:</label>
          <div v-for="(image, index) in selectedProduct.images" :key="index">
            <input v-model="selectedProduct.images[index]" class="border p-2 w-full rounded-lg text-sm" />
          </div>
          <div class="flex justify-between mt-4">
            <button @click="closeModals" class="px-4 py-2 bg-gray-400 text-white text-sm rounded-lg">
              Cancel
            </button>
            <button @click="updateProduct" class="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    // ============================= -->
    // PRODUCT MANAGEMENT SECTION -->
    // ============================= -->
    const products = ref([]);
    const selectedProduct = ref(null);
    const isEditModalOpen = ref(false);
    const isProductListModalOpen = ref(false);
    const successMessage = ref(null);
    const error = ref(null);
    const parentId = ref(null);


    // Fetch Products
    const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/products");

    if (!response.data || response.data.length === 0) {
      console.error("❌ No products found in the database.");
      return;
    }

    console.log("🔹 API Response:", response.data);

    // ✅ Extract the correct product structure
    products.value = response.data; // Since we're using the Product model directly

  } catch (err) {
    console.error("❌ Failed to fetch products:", err);
  }
};




    // Open Product List Modal
    const openProductListModal = () => {
      fetchProducts();
      isProductListModalOpen.value = true;
    };

    // Open Edit Product Modal
    const selectProduct = (product) => {
  selectedProduct.value = { ...product }; // ✅ Prevent direct mutation
  isEditModalOpen.value = true;
};


    // Save Product Changes
    const updateProduct = async () => {
  if (!selectedProduct.value || !selectedProduct.value._id) {
    console.error("❌ Product ID is missing!");
    return;
  }

  console.log("🔄 Sending update request for product:", selectedProduct.value);

  try {
    await axios.put(
      `http://localhost:5000/api/products/${selectedProduct.value._id}`,
      selectedProduct.value
    );

    alert("✅ Product updated successfully!");
    isEditModalOpen.value = false;
    fetchProducts(); // Refresh the list
  } catch (err) {
    console.error("❌ Error updating product:", err);
  }
};




    // Close All Modals
    const closeModals = () => {
      isEditModalOpen.value = false;
      isProductListModalOpen.value = false;
    };

    onMounted(() => {
      fetchProducts();
    });

    // ============================= -->
    // HOME MANAGEMENT SECTION -->
    // ============================= -->
    const isModalOpen = ref(false);
    const form = ref({
      title: "",
      description: "",
      image1: "",
      image2: "",
      image3: "",
    });
    const images = ["image1", "image2", "image3"]; // Array for easier image mapping

    // Fetch Homepage Data
    const fetchHomepageData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/homepage");
        if (response.data && response.data.content) {
          form.value = { ...response.data.content };
        }
      } catch (error) {
        console.error("❌ Error fetching homepage data:", error);
      }
    };

    const openModal = () => {
      fetchHomepageData();
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveChanges = async () => {
      try {
        await axios.put("http://localhost:5000/api/homepage", form.value);
        alert("✅ Homepage updated successfully!");
        closeModal();
      } catch (error) {
        console.error("❌ Error updating homepage:", error);
      }
    };

    const uploadImage = (event, key) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          form.value[key] = reader.result; // Convert image to Base64 URL
        };
        reader.readAsDataURL(file);
      }
    };

    onMounted(fetchHomepageData);

    return {
      // Product Section
      products,
      selectedProduct,
      isEditModalOpen,
      isProductListModalOpen,
      successMessage,
      error,
      fetchProducts,
      openProductListModal,
      selectProduct,
      updateProduct,
      closeModals,

      // Home Section
      isModalOpen,
      form,
      images,
      fetchHomepageData,
      openModal,
      closeModal,
      saveChanges,
      uploadImage,
    };
  },
};
</script>

<style scoped>
.modal {
  background: rgba(0, 0, 0, 0.5);
}
</style>
