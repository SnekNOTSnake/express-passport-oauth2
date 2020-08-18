const express = require('express');
const { protect } = require('../controllers/Auth-controller');
const { greetings, getMe } = require('../controllers/View-controller');

const router = express.Router();

router.get('/', greetings);
router.get('/me', protect, getMe);

module.exports = router;
