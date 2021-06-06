import fs from 'fs';
import path from 'path';

export default class Logger {
  writeInFileSync(filePath: string, data: string) {
    fs.appendFileSync(path.resolve(filePath), data);
  }

  writeInFile(filePath: string, data: string) {
    fs.appendFile(path.resolve(filePath), data, () => {});
  }

  error(message: string) {
    this.writeInFileSync('error-log', message);
  }

  log(message: string) {
    this.writeInFile('log', message);
  }
}
