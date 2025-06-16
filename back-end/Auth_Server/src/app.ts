import express from "express";
import cors from "cors";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

dotenv.config();

const origin =
  process.env["LOCAL_ENV"] === "local"
    ? "http://localhost:5173"
    : "https://content-management-react-app.onrender.com";

const app = express();
console.log(origin);

app.use(
  cors({
    origin, // your frontend origin
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(routes);

export default app;
