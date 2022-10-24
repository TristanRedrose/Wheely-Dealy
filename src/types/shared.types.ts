import { User } from "./user.type";

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface TypedRequestQuery<T> extends Express.Request {
  query: T;
}

export type tokenPayload = {
  user: User;
  iat: number;
  exp: number;
}

export type UserName = {
  username: string;
}

export type Options = {
  page: number;
  limit: number;
  collation: Collation;
  populate: Populate;
}

type Collation = {
  locale: string;
  strength: number;
}

type Populate = {
  path: string,
  select: string,
}