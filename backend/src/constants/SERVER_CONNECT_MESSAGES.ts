import colors from 'colors';

const port = Number(process.env.SERVER_PORT);
export const SERVER_CONNECT_MESSAGES = {
  server: {
    success: [
      '🖥️ ',
      colors.bgBlack.bold(` SERVER `),
      ` App is running, visit: `,
      colors.blue(`http://localhost:${port}`),
    ].join(''),
  },
  error: {
    portInUse: [
      '❌ ',
      colors.bgBlack.bold(` ERROR `),
      ` Port ${port} is already in use. Please choose another port.`,
    ].join(''),
    serverFailure: (error: NodeJS.ErrnoException) =>
      ['❌ ', colors.bgRed.bold(` ERROR `), ` Failed to start the server: `, colors.red(error.message)].join(''),
    unexpected: (error: Error) =>
      ['❌ ', colors.bgRed.bold(` ERROR `), ` An unexpected error occurred: `, colors.red(error.message)].join(''),
    unknown: ['❌ ', colors.bgRed.bold(` ERROR `), ` An unknown error occurred.`].join(''),
  },
};
