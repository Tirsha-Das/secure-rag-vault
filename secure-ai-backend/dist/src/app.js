import express from 'express';
// import dotenv from 'dotenv';
import router from './routes/routes.js';
const app = express();
//Middleware
app.use(express.json());
// Routes
app.get('/health', (req, res) => {
    res.send('OK');
});
app.use('/api', router);
export default app;
