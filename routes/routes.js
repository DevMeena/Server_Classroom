import express from 'express';
// import { signUp } from '../controllers/auth.js';
import { startPage, signUp } from '../controllers/auth.js';

const router = express.Router();
//localhost:5000/home
router.get('/', startPage)
router.post('/', signUp)

export default router;