const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/Auth');

// Log incoming requests
router.use((req, res, next) => {
  console.log('Auth Route:', req.method, req.path);
  next();
});

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;