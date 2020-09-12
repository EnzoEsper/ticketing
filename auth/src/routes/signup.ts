import express, { Request, Response} from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post("/api/users/signup", [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
],
async (req: Request, res: Response) => {
  // validationResult inspects the request and pull out any info that was appended to the req during the validation step 
  const errors = validationResult(req);

  // if the errors object is not empty we need to handle the error that ocurred  
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  console.log('Creating a user...');
  throw new DatabaseConnectionError();
  
  res.send({});
});

export { router as signupRouter };