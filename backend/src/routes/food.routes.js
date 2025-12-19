const express =require('express');
const router = express.Router();

const foodController = require("../controllers/food.controller");
const authMiddleWare = require("../middlewares/auth.middleware");

// post /api/food/ [protected]
router.post('/', authMiddleWare.authFoodPartnerMiddleware , foodController.createFood)

module.exports = router