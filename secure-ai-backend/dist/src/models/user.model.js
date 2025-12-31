import pool from '../../config/db.js';
import bcrypt from 'bcrypt';
const registerUser = async (userData) => {
    const { email, password } = userData;
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at';
    const values = [email, password_hash];
    const { rows } = await pool.query(query, values);
    return rows[0];
};
const loginUser = async (userData) => {
    try {
        const { email, password } = userData;
        const query = 'SELECT email, password FROM users WHERE email = $1';
        const values = [email];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            throw new Error('User not found');
        }
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid password');
        }
        return { email: user.email };
    }
    catch (error) {
        throw error;
    }
};
export default { registerUser, loginUser };
