import express from "express";
import jwt from 'jsonwebtoken';
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

// the goal of this route handler -> react app can figure out whether or not a user is signed in in the app
// the react app will make a request to figure out who the current user is and icludes the cookie inside that request depending if is logged in or not
router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
