import express from 'express';
import {createChat , findChats , findUserChats} from '../controllers/chatControllers.js' 
const router = express.Router();

router.post('/' , createChat );
router.get('/:userId' , findUserChats)
router.get('/find/:firstId/:secondId' , findChats)

export default router; 