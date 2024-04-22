import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword, comparePassword} from '../utils/password.js';
import {createJWT} from '../utils/token.js';
import { UnauthenticatedError } from '../errors/customErrors.js';

export const register = async(req, res) => {
    const isFirstAccount = await User.countDocuments() === 0;
    req.body.role = isFirstAccount ? "admin" : "user";
    
    req.body.password = await hashPassword(req.body.password);

    const user = await User.create(req.body);
    
    return res.status(StatusCodes.CREATED).json({user});
}

export const login = async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    
    const isValidUser = user && (await comparePassword(req.body.password, user.password));
    if(!isValidUser) {
        throw new UnauthenticatedError("Invalid credentials");
    }
    
    const tokenUser = {userId: user._id, role: user.role};
    const token = await createJWT(tokenUser);

    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',  
    })
    return res.status(StatusCodes.CREATED).json({msg: "Login successfully"});

}

export const logout = async(req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === 'production'
    })

    return res.status(StatusCodes.OK).json({msg: "Log out successfully"});
}
