import express from "express";
import jwt from 'jsonwebtoken';

const router = express.Router();

// the goal of this route handler -> react app can figure out whether or not a user is signed in in the app
// the react app will make a request to figure out who the current user is and icludes the cookie inside that request depending if is logged in or not
router.get("/api/users/currentuser", (req, res) => {
  // if there is no jwt property on req.session that means that the user is not logged in
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    // extracting the payload out of the token
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
  
    res.send({ currentUser: payload });
  } catch (error) {
    // if the verify function returns an error that means that something went wrong with the true jwt
    return res.send({ currentUser: null});
  }


});

export { router as currentUserRouter };
