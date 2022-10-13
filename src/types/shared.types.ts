import { User } from "./user.type";

export interface TypedRequestBody<T> extends Express.Request {
    body: T;
  }

export type tokenPayload = {
  user: User;
  iat: number;
  exp: number;
}