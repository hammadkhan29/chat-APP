import express from 'express';
import { getMessage ,createMessage } from '../controllers/messageController.js';
const router = express.Router();

router.post('/' , createMessage );
router.get('/:chatId' , getMessage)

export default router; 