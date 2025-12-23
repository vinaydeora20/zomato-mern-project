const express = require('express');

const authControl = require("../controllers/auth.controller")
const router = express.Router();
// user Api's
router.post('/user/register', authControl.registerUser);
router.post('/user/login', authControl.LoginUser);
router.post('/user/logout', authControl.LogoutUser);

// food-partner APi's
router.post('/FoodPartner/register', authControl.FoodPartnerRegister);
router.post('/FoodPartner/login', authControl.LoginFoodPartner);
router.post('/FoodPartner/logout', authControl.LogoutFoodPartner);

module.exports = router;

