const express = require('express');
const router = express.Router();

const { login, registerBank, registerUser } = require('../controllers/authController')

router.post('/register-user', registerUser);
router.post('/register-bank', registerBank);
router.post('/login', login);

module.exports = router;