const { Router } = require('express')
const router = Router()
const verifyToken = require('../middleware/verifyToken')
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.signup )
router.post('/signin', authController.signin)
router.get('/me', verifyToken, authController.me)
router.get('/dashboard', verifyToken, authController.dashboard)

module.exports = router