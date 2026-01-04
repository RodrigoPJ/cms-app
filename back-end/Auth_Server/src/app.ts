import express, { Express } from "express";
import cors from "cors";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";

export function createApp(origin: string): Express {
  const app = express();
  console.log(`Front end url: ${origin}`);

  app.use(
    cors({
      origin, // frontend origin
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use('/api/auth', routes);
  return app;
}
