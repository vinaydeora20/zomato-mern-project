const foodModel = require('../models/food.model');
const imageKitService = require('../services/imagekit.service');
const { v4: uuid } = require('uuid');

async function createFood(req, res) {
  try {
    // 🔍 debug samajhne ke liye
    console.log("foodPartner:", req.foodPartner);
    console.log("body:", req.body);
    console.log("file:", req.file);
  
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Video is required" });
    }

    // 📤 ImageKit upload
    const uploadResult = await imageKitService.uploadFile(
      req.file.buffer,
      `${uuid()}-${req.file.originalname}`
    );

    // 💾 DB save
    const food = await foodModel.create({
      name,
      description,
      video: uploadResult.url,
      foodPartner: req.foodPartner._id
    });

    res.status(201).json({
      message: "Food item created",
      food
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getFoodItems(req , res){
  const foodItems = await foodModel.find({});
  res.status(200).json({
    message:"food item fetch succesfully",
    foodItems
  })
}

module.exports = {
  createFood,
  getFoodItems,
};
