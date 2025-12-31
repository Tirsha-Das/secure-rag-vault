import express from 'express';
import cors from 'cors';
import router from './routes/routes';
import { httpLogger } from './middleware/httplogger.middleware';
import path from 'path';

const app = express();

app.use(cors());
app.use(httpLogger);
app.use(express.json());
app.use(express.static('public'));

app.get('/health', (_req, res) => {
  res.send('OK');
});

app.use('/api', router);

export default app;
