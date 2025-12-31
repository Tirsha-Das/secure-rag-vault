import pool from '../../config/db.js';
import bcrypt from 'bcrypt';
// interface UserResponse {
//   email: string;
//   created_at: Date;
// }
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
export default { loginUser };
