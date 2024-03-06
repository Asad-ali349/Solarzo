import express from 'express';

import { Signin,ForgotPassword,ResetPassword } from '../controllers/auth.js';
const router= express.Router();

router.post('/signin',Signin);
router.post('/forgot_password',ForgotPassword);
router.patch('/reset_password/:token',ResetPassword);


export default router;