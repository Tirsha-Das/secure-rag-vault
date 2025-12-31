import pool from '../../config/db';
import bcrypt from 'bcrypt';
import { logger } from '../middleware/logger.middleware';

interface UserData {
  email: string;
  password: string;
}

interface UserResponse {
  email: string;
  created_at: Date;
}

const registerUser = async (userData: UserData): Promise<UserResponse> => {
  const { email, password } = userData;
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at';
  const values = [email, password_hash];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

const loginUser = async (userData: UserData): Promise<any> => {
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
    } catch (error) {
        throw error;
    }
};

const testUser = async (): Promise<any> => {
    try {
      const data = [
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "qui est esse",
          "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
          "userId": 1,
          "id": 3,
          "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        },
        {
          "userId": 1,
          "id": 4,
          "title": "eum et est occaecati",
          "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
        },
        {
          "userId": 1,
          "id": 5,
          "title": "nesciunt quas odio",
          "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
        }
      ];
      
      logger.info('Test data fetched successfully:', { data });
      return data;
    } catch (error) {
        logger.error('Failed to fetch test data');
        throw error;
    } 
  };

export default { registerUser, loginUser, testUser };
