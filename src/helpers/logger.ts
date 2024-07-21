import * as fs from 'fs';

let instance: LoggerInstance | undefined = undefined;

enum SystemTextStyles {
  Reset = '\x1b[0m',
  Bright = '\x1b[1m',
  Dim = '\x1b[2m',
  Underscore = '\x1b[4m',
  Blink = '\x1b[5m',
  Reverse = '\x1b[7m',
  Hidden = '\x1b[8m',
}

enum SystemFgColors {
  FgBlack = '\x1b[30m',
  FgRed = '\x1b[31m',
  FgGreen = '\x1b[32m',
  FgYellow = '\x1b[33m',
  FgBlue = '\x1b[34m',
  FgMagenta = '\x1b[35m',
  FgCyan = '\x1b[36m',
  FgWhite = '\x1b[37m',
  FgGray = '\x1b[90m',
}

class LoggerInstance {
  private logsTempData: string[];

  private writeLogs: boolean;

  constructor(writeLogs: boolean) {
    this.writeLogs = writeLogs;

    if (instance) {
      this.logError(`Can't create new instance of Logger`);
    }

    this.logsTempData = [];

    const logsDir = fs.existsSync(`${__dirname + '/../logs'}`);
    const logsFile = fs.existsSync(`${__dirname + '/../logs/logs.txt'}`);

    if (!logsDir) {
      fs.mkdirSync(`${__dirname + '/../logs'}`);

      if (!logsFile) {
        fs.writeFile(`${__dirname + '/../logs/logs.txt'}`, '', (writeErr) => {
          if (writeErr) this.logError(writeErr);
        });
      }
    }

    if (this.writeLogs) {
      setInterval(() => {
        this.addLogsToFileAndClearTemp();
      }, 10000);
    }

    instance = this;
  }

  public logInfo<T>(message: T) {
    const style = `${this.getConsoleColor(SystemFgColors.FgYellow)}`;
    const text = `[${this.getDateUTC()}] [INFO]: ${message}`;

    console.log(`${style}`, `${text}`);

    if (this.writeLogs) this.logsTempData.push(text);
  }

  public logError<T>(message: T) {
    const style = `${this.getConsoleColor(SystemFgColors.FgRed)}`;
    const text = `[${this.getDateUTC()}] [ERROR]: ${message}`;

    console.log(`${style}`, `${text}`);

    if (this.writeLogs) this.logsTempData.push(text);
  }

  private getDateUTC(): string {
    return new Date().toUTCString();
  }

  private getConsoleColor(color: SystemFgColors, style?: SystemTextStyles): string {
    return `${color}%s${style || ''}${SystemTextStyles.Reset}`;
  }

  private addLogsToFileAndClearTemp() {
    let parsedLogs = '';

    for (const item of this.logsTempData) {
      parsedLogs += `${item}\n`;
    }

    fs.appendFile(`${__dirname + '/../logs/logs.txt'}`, parsedLogs, (err) => {
      if (err) this.logError(err);
      this.logInfo('Logs have been written to file');
    });

    this.logsTempData = [];
  }
}

const Logger = new LoggerInstance(Boolean(Number(process.env.WRITE_LOGS)) || false);

export default Logger;
