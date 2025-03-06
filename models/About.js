const mongoose = require("mongoose");


const AboutSchema = new mongoose.Schema({
  vision: { type: String, required: true },
  team: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  coreValues: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
  contactCTA: {
    text: { type: String, required: true },
    buttonLabel: { type: String, required: true },
    link: { type: String, required: true },
  },
});

module.exports = mongoose.model("About", AboutSchema);
