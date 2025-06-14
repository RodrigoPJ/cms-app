import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
import cookieParser from 'cookie-parser'
const app = express();
app.use(cors(
  {
     origin: 'https://content-management-react-app.onrender.com', // your frontend origin
  credentials: true,     
} ));
app.use(cookieParser());
app.use(express.json());

app.use(routes);

export default app;