import express from 'express';
const Router = express.Router();

import {login, register, logout} from '../controllers/authController.js';
import {validateRegister, validateLogin} from '../middlewares/validation.js';


Router.post('/register',validateRegister, register);
Router.post('/login', validateLogin, login);
Router.get('/logout', logout);

export default Router;