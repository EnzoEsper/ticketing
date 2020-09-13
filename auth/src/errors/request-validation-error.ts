import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  // the keyword private/public allows to take the property errors passed as a parameter and asign as a property to the overall class
  constructor(public errors: ValidationError[]) {
    // only for logging purposes, this is not sending to the users
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param };
    });
  }
}

