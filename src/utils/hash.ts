import bcrypt from 'bcryptjs'

export const hashedPassword = async (password: string) => {
    return await bcrypt.hash (password, 12);
};


export const comparePassword = async (
    password: string,
    hashed: string
) =>{
    return await bcrypt.compare(password, hashed)
}