const express = require('express');
const{register,login} = require('../Controllers/userController');
//create router
const router = express.Router();

//path for register
router.post('/register', register);

//path for login
router.post('/login',login)

//export router
module.exports = router;