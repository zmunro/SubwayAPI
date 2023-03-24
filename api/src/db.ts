import { Pool } from 'pg';


const poolConfig = {
  user: `${process.env.POSTGRES_USER}`,
  database: `${process.env.POSTGRES_DB_PREFIX}_${process.env.POSTGRES_DB_NAME}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  port: parseInt(`${process.env.POSTGRES_DB_PORT}`),
  host: `${process.env.POSTGRES_DB_HOST}`,
}


const pool = new Pool(poolConfig)

export const connectWithRetry = () => {
  console.log('Attempting to connect to the database...');
  pool
    .connect()
    .then(() => {
      console.log('Connected to the database successfully');
    })
    .catch((error) => {
      console.error('Failed to connect to the database:', error);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

export default pool;
