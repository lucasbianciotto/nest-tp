import { Request } from 'express';

export type UsersRequestType = Request & {
  user: {
    id: string;
    name: string;
    email: string;
  };
}