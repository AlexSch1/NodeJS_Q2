import http from 'http';

export default class HttpError extends Error {
  readonly name: string = 'HttpError';

  constructor(
    public status: number,
    message?: string,
  ) {
    super(message || http.STATUS_CODES[status]);
  }
}
