import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@tickgit/common";

const app = express();
// to make sure that express is aware that is behind a proxy of ingress-nginx and to make sure that it should still 
// trust traffic as being secure even though is comming from the proxy  
app.set('trust proxy', true); 
app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption of the cookie that contains the jwt
    secure: process.env.NODE_ENV !== 'test' // cookie is only being used if the user is using the app over https (little secure improvement)
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };