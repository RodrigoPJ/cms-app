import { AppDataSource } from "./database/db-config/data-source";
import { log } from "console";
import app from "./app";
import dotenv from 'dotenv';

dotenv.config();

AppDataSource.initialize().then((DataSource) => {
  log('database connected: ', DataSource.options.type)
  return app.listen(process.env.PORT,()=>{
    log(`Listening on port: ${process.env.PORT}`)
  });
});
