export type Port = number;

export interface Enviroment {
  author: string;
  app: {
    port: Port;
  };
  database: {
    production: string;
    development: string;
  };
  token: {
    secret: string;
    expired: number;
  };
  page: { auth: string; admin: string; user: string };
}

export interface ResponseService {
  error: boolean;
  message: string;
  data?: any;
}

export interface ResponseAuthentication {
  isAuthenticated: boolean;
  message: string;
}
