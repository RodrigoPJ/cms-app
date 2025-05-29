import express  from 'express';
import cors from 'cors';
import routes from './routes/routes';
import cookieParser from 'cookie-parser'
import aunthenticateRequest from './middleware/authenticate';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
 app.use(aunthenticateRequest)
app.use(routes);

export default app;