const allowedIpsEnvironment = {
  production: ['104.21.39.127', '172.67.145.75'],
  development: ['127.0.0.1', '::1'],
};

export const ALLOWED_CLIENT_IPS =
  process.env.NODE_ENV === 'development' ? allowedIpsEnvironment.development : allowedIpsEnvironment.production;
