require("dotenv").config();
const mongoose = require("mongoose");
const About = require("../models/About");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Seed Data
const aboutData = {
  vision: "We believe that architecture is not just about buildings—it's about creating spaces that inspire, connect, and enhance lives.",
  team: {
    title: "Our Team",
    description: "We are a passionate team of architects and designers committed to creating sustainable architectural solutions.",
    image: "https://brok.qodeinteractive.com/wp-content/uploads/2021/10/ip5-img-gallery-img3.jpg",
  },
  coreValues: [
    {
      title: "Sustainability",
      description: "We prioritize eco-friendly designs that harmonize with nature.",
      image: "https://brok.qodeinteractive.com/wp-content/uploads/2021/10/Main-home-team-01.jpg",
    },
    {
      title: "Innovation",
      description: "We push the boundaries of design and technology to create cutting-edge solutions.",
      image: "https://brok.qodeinteractive.com/wp-content/uploads/2021/10/Main-home-team-02.jpg",
    },
    {
      title: "Client Satisfaction",
      description: "We work closely with our clients to bring their visions to life.",
      image: "https://brok.qodeinteractive.com/wp-content/uploads/2021/10/Main-home-team-03.jpg",
    }
  ],  

  contactCTA: 
  {
    text: "Let's build something amazing together.",
    buttonLabel: "Contact Us",
    link: "https://t.me/Yean_Architect"
  },
};

// Seed Function
const seedAbout = async () => {
  try {
    await About.deleteMany(); // Clear existing data
    await About.create(aboutData);
    console.log("✅ About Us data seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding About Us data:", error);
    mongoose.connection.close();
  }
};

// Run Seeder
seedAbout();
