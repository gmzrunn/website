const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);//http://localhost:3000/users/register
router.post('/login', authController.login);//http://localhost:3000/users/login
router.post('/logout', authController.logout);//http://localhost:3000/users/logout

module.exports = router;
