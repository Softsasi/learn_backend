const appConfig = {
  app_url: process.env.APP_URL || 'http://localhost:3000',
  backend_Url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
};

Object.freeze(appConfig);

export { appConfig };
