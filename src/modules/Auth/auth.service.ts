import User from './user.model.js'
import { hashedPassword, comparePassword } from '../../utils/hash.js'
import { generateToken } from '../../utils/jwt.js'

export const registerUser = async (data: any) => {
    const exists = await User.findOne({ $or: [{ phone: data.phone }, { email: data.email }] });
    if (exists) {
        throw new Error("User already exists");
    }

    const hashed = await hashedPassword(data.password);
    const user = await User.create({
        ...data,
        password: hashed
    });
    const token = generateToken({ id: user._id });
    return { user, token };
}

export const LoginUser = async (data: any) => {
    const user = await User.findOne({ $or: [{ phone: data.phone }, { email: data.email }] });
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await comparePassword(data.password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken({ id: user._id });
    return { user, token };
}