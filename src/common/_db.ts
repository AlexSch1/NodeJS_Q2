import config from './config';
import { createConnection } from 'typeorm';

const connectToDb =  async () => {
  let connection;
  
  // try {
  //   connection = getConnection('my-connection');
  // } catch (e) {
  //   console.error(e);
  // }

  try {
    if (connection) {
      // if (!connection.isConnected) {
      //   // await connection.connect();
      // }
    } else {
      connection = await createConnection(config.orm);
      // await connection.runMigrations();
    }
    console.log('Database connected');
  } catch (e) {
    console.log('Connection error', e);
  }
}

export const tryConnect = async (cb: () => void) => {
  try {
    await connectToDb();
    cb();
  } catch (e) {
    console.log('Db connection error', e);
  }
}
