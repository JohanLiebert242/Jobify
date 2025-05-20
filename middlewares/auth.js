import {
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/token.js";

export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new UnauthenticatedError("Token invalid. Please try again");
    }

    try {
        const { userId, role } = verifyJWT(token);
        const testUser = userId === "66a25ee966bad696083b15aa";
        req.user = { userId, role, testUser };
        next();
    } catch (error) {
        throw new authenticateUser("authentication invalid");
    }
};

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError("Unauthorized to access this route");
        }
        next();
    };
};

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
        throw new BadRequestError("Demo User. Read only");
    }
    next();
};
