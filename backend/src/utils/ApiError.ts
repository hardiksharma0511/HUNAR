// A small helper so controllers can throw errors with an HTTP status attached,
// and the central error handler knows what code to respond with.
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
