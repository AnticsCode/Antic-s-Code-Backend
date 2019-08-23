declare namespace Express {
  export interface Request {
    user: User;
  }
}

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  account: string;
}