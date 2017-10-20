import express from 'express';
import Auth from '../controller/auth/auth'
const router = express.Router();


//用户账号密码授权token
router.get('/token', Auth.auth);



export default router;