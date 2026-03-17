/* eslint-disable no-console */
export const log = (...args: unknown[]): void => {
  console.log(...args);
};

export const logError = (...args: unknown[]): void => {
  console.error(...args);
};
