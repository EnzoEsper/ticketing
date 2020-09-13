import { CustomError } from "./custom-error";

// error for general use -> we are going to use it anytime that something goes wrong in the request handler due to some input that a user give us
export class BadRequestError extends CustomError {
  statusCode = 400;

  // with public message we capture the message param as a property in the instance of the class
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}