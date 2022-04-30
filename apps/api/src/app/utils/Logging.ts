// import chalk from 'chalk';

export class Logger {
  success(...args: unknown[]) {
    console.log(...args);
    // console.log(chalk.greenBright(...args));
  }
  error(...args: unknown[]) {
    console.log(...args);
  }
  warn(...args: unknown[]) {
    console.log(...args);
  }
  info(...args: unknown[]) {
    console.log(...args);
  }
}
