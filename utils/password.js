import  bcrypt from 'bcrypt';


export const hashPassword = async(inputPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(inputPassword, salt);
    
    return hashedPassword;
}

export const comparePassword = async(password, hashedPassword) => {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatched;
}