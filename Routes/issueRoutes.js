const express = require('express');
const createIssue = require('../Controllers/issueControllers');
const authenticate = require('../middleware/protectedRoute');

//create router
const router = express.Router();

// Issue ENDPOINTS
router.post('/create', authenticate, createIssue);



module.exports = router;