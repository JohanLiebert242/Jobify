import User from '../models/User.js';
import Job from '../models/Jobs.js';
import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import { formatImage } from '../middlewares/multer.js';

export const getCurrentUser = async(req, res) => {
    const user = await User.findOne({_id: req.user.userId});

    const userWithoutPassword = user.removePassword();

    return res.status(StatusCodes.OK).json({user: userWithoutPassword});
}

export const updateUser = async(req, res) => {
    const newUser = {...req.body};
    delete newUser.password;
    delete newUser.role;
    
    if(req.file) {
        const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file);

        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    //User uploads new avatar, delete old one since 
    //cloudinary charges for these files.
    if(req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }
    
    return res.status(StatusCodes.OK).json({msg: "User updated!", updateUser});
}

export const getApplicationStatus = async(req, res) => {
    const user = await User.countDocuments();
    const jobs = await Job.countDocuments();

    res.status(StatusCodes.OK).json({user, jobs});

}

