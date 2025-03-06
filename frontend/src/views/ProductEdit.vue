<template>
    <div class="p-6">
      <h2 class="text-lg font-bold mb-4">Edit Product</h2>
  
      <label>Product Name:</label>
      <input v-model="product.name" class="w-full p-2 border rounded mb-3" />
  
      <label>Description:</label>
      <textarea v-model="product.description" class="w-full p-2 border rounded mb-3"></textarea>
  
      <label>Size:</label>
      <input v-model="product.size" class="w-full p-2 border rounded mb-3" />
  
      <label>Type:</label>
      <input v-model="product.type" class="w-full p-2 border rounded mb-3" />
  
      <!-- ✅ File Upload Section -->
      <label>Upload Image:</label>
        <div class="mb-3 flex flex-col">
        <input 
            type="file" 
            @change="handleFileUpload" 
            accept="image/*" 
            class="w-full p-2 border rounded bg-white cursor-pointer"
        />
        <p v-if="product.imageFile" class="text-sm text-gray-600">Selected: {{ product.imageFile.name }}</p>
        </div>

  
      <!-- ✅ Image Links -->
      <label>Image Links:</label>
      <div v-for="(img, index) in product.images" :key="index" class="flex items-center space-x-2">
        <input v-model="product.images[index]" class="w-full p-2 border rounded" placeholder="Enter image URL" />
        <button @click="removeImage(index)" class="text-red-500">❌</button>
      </div>
  
      <!-- ✅ Add New Image Link Button -->
      <button @click="addImageLink" class="bg-blue-500 text-white p-2 mt-2 rounded">+ Add Image Link</button>
  
      <!-- ✅ Save Changes -->
      <div class="flex justify-end mt-4">
        <button @click="updateProduct" class="bg-blue-600 text-white p-2 rounded">Save Changes</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  
  const product = ref({
    _id: "",
    name: "",
    description: "",
    size: "",
    type: "",
    images: [],
    imageFile: null, // Store uploaded file
  });
  
  // ✅ Add empty input field for image link
  const addImageLink = () => {
    product.value.images.push("");
  };
  
  // ✅ Remove image link
  const removeImage = (index) => {
    product.value.images.splice(index, 1);
  };
  
  // ✅ Handle File Upload
  const handleFileUpload = (event) => {
    product.value.imageFile = event.target.files[0]; // Store uploaded file
  };
  
  // ✅ Update Product
  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("name", product.value.name);
    formData.append("description", product.value.description);
    formData.append("size", product.value.size);
    formData.append("type", product.value.type);
    formData.append("images", JSON.stringify(product.value.images));
  
    if (product.value.imageFile) {
      formData.append("imageFile", product.value.imageFile); // Append uploaded file
    }
  
    try {
      await axios.put(`http://localhost:5000/api/products/${product.value._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product updated successfully!");
    } catch (error) {
      console.error("❌ Error updating product:", error);
    }
  };
  </script>
  
  