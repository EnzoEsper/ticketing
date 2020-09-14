import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/api/users/signin", [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
],
validateRequest, 
async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordsMatch = await Password.compare(existingUser.password, password);
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  // generate jwt
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY!)

  // store jwt on session object
  // that is how is stored info inside the cookie, req session gives an object that is created by the cookie-session middleware
  // any info stored in this object will be serialized by cookie-session and stored inside the cookie
  req.session = {
    jwt: userJwt
  };

  res.status(200).send(existingUser);
});

export { router as signinRouter };