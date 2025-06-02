import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import cookieParser from 'cookie-parser'
const app = express();
app.use(cors(
  {
     origin: 'http://localhost:5173', // your frontend origin
  credentials: true,     
} ));
app.use(cookieParser());
app.use(express.json());

app.use(routes);

export default app;