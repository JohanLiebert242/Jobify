import express from 'express';
const Router = express.Router();

import {getCurrentUser, getApplicationStatus, updateUser} from '../controllers/userController.js';

import { authorizePermissions, checkForTestUser } from '../middlewares/auth.js';
import {validateUserInput} from '../middlewares/validation.js';

import upload from '../middlewares/multer.js';

Router.route("/update-user").patch(checkForTestUser, upload.single('avatar'), validateUserInput, updateUser);
Router.route('/current-user').get(getCurrentUser);
Router.route("/admin/app-stats").get(authorizePermissions('admin'),getApplicationStatus);

export default Router;