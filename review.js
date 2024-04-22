//Cloudinary 
// import cloudinary from 'cloudinary';
// import {promise as fs} from 'fs';

import mongoose, { plugin } from "mongoose";
import multer = require("multer");
import User from "./models/User";
import Jobs from "./models/Jobs";

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     secret_api: process.env.SECRET_API
// });

// if(req.file) {
//     const response = await cloudinary.v2.uploader.upload(req.file.path);
//     fs.unlink(req.file.path);
// }

// if(req.file && updatedUser.avatarPublicId) {
//     await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
// }

//Multer
//Làm ra thành một middleware riêng lẻ vài xài ở những route muốn
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         const originalname = file.originalname;
//         cb(null, originalname)
//     }
// });

// const upload = multer({storage});
// export default upload;

//Concurrently
// - Use many commands at the same time
// "scripts": {
//     "server": "nodemon server.js",
//     "client": "cd client && npm run dev",
//     "dev": "concurrently --kill-others-on-fail \"npm run server \" \"npm run client "
// }

// export default defineConfig({
//     plugin: [react()],
//     server: {
//         proxy: {
//             '/api': {
//                 target: "http://localhost:5100",
//                 changeOrigin: true,
//                 rewrite: (path) => path.replace
//             }
//         }
//     }
// })

//Validation MiddleWare
// import {body, validationResult} from 'express-validator';

// const validationMiddleWare = (validationRules) => {
//     return [validationRules, (req, res) => {
//         const errors = validationRules(req);
//         if(!errors.isEmpty())
//         //Handle error here
//     }]
// }

// export const validateInput = validationMiddleWare([
//     body('name').notEmpty().withMessage
// ])

//MockData && Populate
//Create mock data in mockaroo

//Populate.js
// try {
//     await mongoose.connect(process.env.MONGO_URL);
//     const user = await User.find({email: 'test@gmail.com'});
//     const jsonJobs = JSON.parse(await readFile('./public/uploads', import.meta.url));
//     const jobs = jsonJobs.map(job => {
//         return {...job, createBy: req.user.userId}
//     })
//     Job.deleteMany({createdBy: req.user.userId});
//     Job.create(jobs);
//     process.exit(0)
// } catch (error) {
//     console.log(error);
//     process.exit(1);
// }

//Aggreration Pipieline
// const status = await Jobs.aggregate([
//     {
//         $match: {
//             createdBy: new mongoose.Types.ObjectId(req.user.userId)
//         },
//     },
//     {
//         $group: {_id: "$jobStatus", count: {$sum: 1}}
//     }
// ])

// const applicationStatus = await Jobs.aggregate([
//     {
//         $match: {
//             createdBy: new mongoose.Types.ObjectId(req.user.userId)
//         }
//     },
//     {
//         $group: {
//             _id: {
//                 year: {$year: "$createdAt"},
//                 month: {$month: "$createdAt"}
//             }
//         }
//     },
//     {
//         $sort: {
//             "_id.year": -1,
//             "_id.month": -1
//         }
//     }
// ])

//Debouncing Techinqua

// const debounce = (fn) => {
//     return (e) => {
//         const form = e.currentTarget.form;
//         let timeoutId;
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => {
//             fn(form);
//         }, 2000)  
//     }
// }


