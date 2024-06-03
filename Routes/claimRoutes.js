const express = require('express');
const createClaim = require('../Controllers/claimControllers');
const authenticate = require('../middleware/protectedRoute');

//create router
const router = express.Router();

// Claim ENDPOINTS
router.post('/create', authenticate , createClaim);




module.exports = router;