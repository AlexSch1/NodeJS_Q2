import { createConnection } from 'typeorm';
import config from './ormconfig';

const connectToDb = async () => {
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
      connection = await createConnection(config);
      await connection.runMigrations();
    }
    console.log('Database connected');
  } catch (e) {
    console.error('Connection error', e);
  }
};

export const tryConnect = async (cb: () => void): Promise<void> => {
  try {
    await connectToDb();
    cb();
  } catch (e) {
    console.log('Db connection error', e);
  }
};
