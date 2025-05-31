import { AppDataSource } from "./database/db-config/data-source";
import { log } from "console";
import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

const PORT:Number = parseInt(process.env.PORT) || 3000;

app.listen(PORT, async()=>{
  log(`listening on port: ${PORT}`)
  const db = await AppDataSource.initialize();
  log('connected to db', db.isInitialized);
})
