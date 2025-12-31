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
export default { registerUser };
