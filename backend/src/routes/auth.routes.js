const express = require('express');

const authControl = require("../controllers/auth.controller")
const router = express.Router();
router.post('/user/register', authControl.registerUser);
 
module.exports= router;

