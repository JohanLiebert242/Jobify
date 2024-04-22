import User from '../models/User.js';
import Job from '../models/Jobs.js';
import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import {promises as fs} from 'fs';

export const getCurrentUser = async(req, res) => {
    const user = await User.findOne({_id: req.user.userId});

    const userWithoutPassword = user.removePassword();

    return res.status(StatusCodes.OK).json({user: userWithoutPassword});
}

export const updateUser = async(req, res) => {
    const newUser = {...req.body};
    delete newUser.password;
    
    if(req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path);

        //Delete file in local folder (public)
        await fs.unlink(req.file.path);
        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    //User uploads new avatar, delete old one since 
    //cloudinary charges for these files.
    if(req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }
    
    return res.status(StatusCodes.OK).json({msg: "User updated!"});
}

export const getApplicationStatus = async(req, res) => {
    const user = await User.countDocuments();
    const jobs = await Job.countDocuments();

    res.status(StatusCodes.OK).json({user, jobs});

}

