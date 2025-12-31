import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}
export const generateToken = (payload) => {
    const options = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, JWT_SECRET, options);
};
