import express from 'express';
import passport from 'passport';
const app = express();

// import { signUp } from '../controllers/auth.js';
import { startPage, signUp, signIn, googleAuth, googleAuthenticate, googleAuthSuccess } from '../controllers/auth.js';
// googleAuth,
const router = express.Router();
//localhost:5000/home
router.get('/', startPage)
router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/auth/google', googleAuth) // GOOGLE O AUTH 2.0
router.get('/auth/google/dashboard', googleAuthenticate , googleAuthSuccess) // GOOGLE O AUTH 2.0
// passport.authenticate('google', { scope: ['profile'] })

export default router;