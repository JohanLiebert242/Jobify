import express from 'express';
const Router = express.Router();

import {login, register, logout} from '../controllers/authController.js';
import {validateRegister, validateLogin} from '../middlewares/validation.js';

import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    message: {msg: "IP rate limit exceeds. Please try again in 15 minutes"}
})

Router.post('/register',apiLimiter, validateRegister, register);
Router.post('/login',apiLimiter, validateLogin, login);
Router.get('/logout', logout);

export default Router;