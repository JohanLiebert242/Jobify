import express from "express";
const Router = express.Router();

import {
    getAllJobs,
    getSingleJob,
    createJob,
    updateJob,
    deleteJob,
    showStats
} from "../controllers/jobsController.js";

import {
    validateJobInput,
    validateIdParams,
} from "../middlewares/validation.js";

import {checkForTestUser} from '../middlewares/auth.js';

Router.route("/").get(getAllJobs).post(checkForTestUser,validateJobInput, createJob);

//Place before id route, since if we dont do so
//the stats will be considered an id
Router.route("/stats").get(showStats);

Router.route("/:id")
    .get(validateIdParams, getSingleJob)
    .patch(checkForTestUser, validateIdParams, updateJob)
    .delete(checkForTestUser, validateIdParams, deleteJob);

export default Router;
