import { Request } from 'express';
type EmptyObject = Record<string, never>;

export type RequestWithQuery<T> = Request<
  EmptyObject,
  EmptyObject,
  EmptyObject,
  T
>;