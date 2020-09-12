export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    // passing the string to the Error class for logging purpose on the server side
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string, field?: string }[];
}