import { ListingId } from "./listing.types";
import { User } from "./user.type";

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface TypedRequestQuery<T> extends Express.Request {
  query: T;
}

export interface AuthenticatedRequest<T> extends Express.Request {
  params?: ListingId,
  body: T,
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
  sort: string;
}

type Collation = {
  locale: string;
  strength: number;
}

type Populate = {
  path: string,
  select: string,
}

export type SessionData = {
  user: string;
  message: string,
  token: string,
  exp: number,
}