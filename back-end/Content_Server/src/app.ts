import express from "express";
import cors from "cors";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";
//import aunthenticateRequest from "./middleware/authenticate";

// here we create a basic express server and add all the middleware
const app = express();

app.use(
  cors({
    origin: "https://content-management-react-app.onrender.com", // your frontend origin
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Only use when the other server is also running
//app.use(aunthenticateRequest)

//main logic and services
app.use('/content',routes);

export default app;
