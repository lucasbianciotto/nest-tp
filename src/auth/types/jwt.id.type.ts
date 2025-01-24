import { JwtPayload } from 'jsonwebtoken';

export type JwtIdType = JwtPayload & {
  id: string;
}