import chalk from "chalk";

export type LogFunction = (...args: unknown[]) => void;

export interface Logger {
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
}

const logger: Logger = {
  info: (...args) => {
    console.log(chalk.yellow("[info]"), ...args);
  },
  warn: (...args) => {
    console.warn(chalk.yellow("[warn]"), ...args);
  },
  error: (...args) => {
    console.error(chalk.red("[err]"), ...args);
  },
};

export default logger;
