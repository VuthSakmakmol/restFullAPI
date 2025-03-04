<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto py-12 px-6">
      <h1 class="text-4xl font-bold text-gray-800 text-center mb-8">About Us</h1>
      <p class="text-gray-600 text-center max-w-2xl mx-auto mb-12">
        We are a passionate team of architects and designers committed to creating timeless, innovative, and sustainable architectural solutions.
      </p>

      <!-- About Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img src="https://source.unsplash.com/600x400/?architecture,team" alt="Our Team" class="rounded-lg shadow-lg">
        </div>
        <div>
          <h2 class="text-3xl font-semibold text-gray-800">Our Vision</h2>
          <p class="text-gray-600 mt-4">
            We believe that architecture is not just about buildings—it's about creating spaces that inspire, connect, and enhance lives. Our designs combine functionality, aesthetics, and sustainability to meet the needs of the modern world.
          </p>
        </div>
      </div>

      <!-- Core Values -->
      <div class="mt-16">
        <h2 class="text-3xl font-semibold text-gray-800 text-center mb-8">Our Core Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <img src="https://img.icons8.com/ios-filled/100/000000/green-energy.png" class="mx-auto mb-4" alt="Sustainability">
            <h3 class="text-xl font-semibold text-gray-800">Sustainability</h3>
            <p class="text-gray-600 mt-2">We prioritize eco-friendly designs that harmonize with nature.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <img src="https://img.icons8.com/ios-filled/100/000000/idea.png" class="mx-auto mb-4" alt="Innovation">
            <h3 class="text-xl font-semibold text-gray-800">Innovation</h3>
            <p class="text-gray-600 mt-2">We push the boundaries of design and technology to create cutting-edge solutions.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg text-center">
            <img src="https://img.icons8.com/ios-filled/100/000000/handshake.png" class="mx-auto mb-4" alt="Client Satisfaction">
            <h3 class="text-xl font-semibold text-gray-800">Client Satisfaction</h3>
            <p class="text-gray-600 mt-2">We work closely with our clients to bring their visions to life.</p>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="text-center mt-16">
        <h2 class="text-3xl font-semibold text-gray-800">Want to Work With Us?</h2>
        <p class="text-gray-600 mt-2">Let's build something amazing together.</p>
        <router-link to="/contact" class="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Contact Us
        </router-link>
      </div>
    </div>
  </div>
</template>
