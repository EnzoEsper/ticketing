import express, { Request, Response} from "express";
import { body, validationResult } from "express-validator";

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
(req: Request, res: Response) => {
  // validationResult inspects the request and pull out any info that was appended to the req during the validation step 
  const errors = validationResult(req);

  // if the errors object is not empty we need to handle the error that ocurred  
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }

  const { email, password } = req.body;

  console.log('Creating a user...');
  
  res.send({});
});

export { router as signupRouter };