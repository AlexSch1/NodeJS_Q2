import config from './common/config';
import app from './app';

app.listen(config.PORT, (): void =>
  console.log(`App is running on http://localhost:${config.PORT}`)
);
