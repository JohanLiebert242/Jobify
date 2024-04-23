import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express';
const app = express();

//Packages
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize'

//Routes
import jobRouter from './routes/jobRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

//Publicy
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//Middlewares
import errorHandler from './middlewares/errorHandler.js';
import { authenticateUser } from './middlewares/auth.js';


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/api/v1/test', (req, res) => {
    res.json({msg: "Test route"});
})

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
  });

app.use(errorHandler);

const port = process.env.PORT || 5100;

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
} catch (error) {
    console.log(error);
    process.exit(1);
}

