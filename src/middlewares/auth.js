import jwt from "jsonwebtoken";
import { CONFIG } from "../core/config.js";

export const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    next("TOKEN_NOT_PROVIDED");
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, CONFIG.SECRET);
  req.user = decodedToken;
  next();
};
