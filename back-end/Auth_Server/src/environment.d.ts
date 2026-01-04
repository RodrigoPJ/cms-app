declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'devlocal';
    DB_HOST: string;
    PORT: string;
    DB_PORT: string;                // database port
    DB_USER: string;            // database user
    DB_PASS: string;                // database password
    DB_NAME: string;            // database name
    environment: string;           // running environment
    JWT_SECRET : string;  //value used to seed the JWT
    FRONT_URL: string;            //url of dev host to add to cors
  }
}
