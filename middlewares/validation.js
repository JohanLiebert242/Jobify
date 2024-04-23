//Libraries
import mongoose from "mongoose";
import { body, param, validationResult } from "express-validator";

import {
    NotFoundError,
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError,
} from "../errors/customErrors.js";

import { JOB_SORT_BY, JOB_TYPE, JOB_STATUS } from "../utils/constants.js";

//Models
import Job from "../models/Jobs.js";
import User from "../models/User.js";

const validationErrors = (validationRules) => {
    return [
        validationRules,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith("no job")) {
                    throw new NotFoundError(errorMessages);
                }
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};

export const validateJobInput = validationErrors([
    body("company").notEmpty().withMessage("Company is required"),
    body("position").notEmpty().withMessage("Company is required"),
    body("jobLocation").notEmpty().withMessage("location is required"),
    body("jobStatus")
        .isIn(Object.values(JOB_STATUS))
        .withMessage("Invalid status value"),
    body("jobType")
        .isIn(Object.values(JOB_TYPE))
        .withMessage("Invalid job type value"),
]);

export const validateIdParams = validationErrors([
    //If this line return true -> OK
    // ............. false -> Error
    param("id").custom(async (value, { req }) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new BadRequestError("Please provide valid id");
        const job = await Job.findById(value);
        if (!job) throw new NotFoundError(`No job with id: ${value}`);
        const isAdmin = req.user.role === "admin";
        const isOwner = req.user.userId === job.createdBy.toString();
        if (!isAdmin && !isOwner) {
            throw new UnauthorizedError("Not authorized to access this route");
        }
    }),
]);

export const validateRegister = validationErrors([
    body("name").notEmpty().withMessage("Please provide name"),
    body("email")
        .notEmpty()
        .withMessage("Please provide email")
        .isEmail()
        .withMessage("Please provide valid email format")
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new BadRequestError("Email already exists");
            }
        }),
    body("password")
        .notEmpty()
        .withMessage("Please provide password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    body("location").notEmpty().withMessage("Please provide location"),
    body("lastName").notEmpty().withMessage("Please provide last name"),
]);

export const validateLogin = validationErrors([
    body("email")
        .notEmpty()
        .withMessage("Please provide email")
        .isEmail()
        .withMessage("Please provide correct email format"),
    body("password").notEmpty().withMessage("Please provide password"),
]);

export const validateUserInput = validationErrors([
    body("name").notEmpty().withMessage("Please provide name"),
    body("lastName").notEmpty().withMessage("Please provide last name"),
    body("email")
        .notEmpty()
        .withMessage("Please provide email")
        .isEmail()
        .withMessage("Please provide email format")
        .custom(async (email, {req}) => {
            const user = await User.findOne({ email });
            if (user && req.user.userId !== user._id.toString()) {
                throw new BadRequestError("Email already exists");
            }
        }),
    body("location").notEmpty().withMessage("Please provide location"),
]);

