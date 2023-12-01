import express from 'express';
import { findUser, getUsers, loginUser, registerUser} from '../controllers/userController.js';

const router = express.Router();

router.post('/register' , registerUser );
router.post('/login-user' , loginUser );
router.get('/find/:userId' , findUser)
router.get('/get-users' , getUsers)

export default router; 