import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export const authGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    
    const decoded = verifyToken(token);


    (req as any).user = decoded;
    console.log(decoded)
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};


