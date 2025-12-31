import Register from '../models/RegisterUser.js';
export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const newUser = await Register.registerUser({ email, password });
        console.log('Registered new user with email:', newUser.email);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        // Handle duplicate email error
        if (error.code === '23505' && error.constraint === 'users_email_key') {
            res.status(409).json({ error: 'Email address is already in use' });
            return;
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
