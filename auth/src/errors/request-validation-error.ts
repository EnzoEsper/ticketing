import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  // the keyword private allows to take the property errors passed as a parameter and asign as a property to the overall class
  constructor(public errors: ValidationError[]) {
    super();

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}

