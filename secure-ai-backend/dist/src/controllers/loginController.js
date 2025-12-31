import LoginUser from '../models/LoginUser.js';
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login request received with email:', email);
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const newUser = await LoginUser.loginUser({ email, password });
        res.status(201).json({ message: 'User logged in successfully', user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
