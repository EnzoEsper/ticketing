import express, { Request, Response} from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

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

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email alredy in use');  
  }

  const user = User.build({ email, password });
  await user.save();

  // generate jwt
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, 'asdf')

  // store jwt on session object
  // that is how is stored info inside the cookie, req session gives an object that is created by the cookie-session middleware
  // any info stored in this object will be serialized by cookie-session and stored inside the cookie
  req.session = {
    jwt: userJwt
  };

  res.status(201).send(user);
});

export { router as signupRouter };