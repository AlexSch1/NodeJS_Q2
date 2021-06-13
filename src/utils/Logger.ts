import fs from 'fs';
import path from 'path';

export default class Logger {
  writeInFileSync(filePath: string, data: string): void {
    fs.appendFileSync(path.resolve(filePath), data);
  }

  writeInFile(filePath: string, data: string): void {
    fs.appendFile(path.resolve(filePath), data, () => {});
  }

  error(message: string): void {
    this.writeInFileSync('error-log', message);
  }

  log(message: string): void {
    this.writeInFile('log', message);
  }
}
