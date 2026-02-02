import type { Request, Response } from "express";
import { registerUser, LoginUser } from "./auth.service.js";   

export const register = async (req: Request, res: Response) => {
    try {
        const data = await registerUser(req.body);
        res.status(201).json({ user: data.user, token: data.token });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message }); 
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const data = await LoginUser(req.body);
        res.status(200).json({ user: data.user, token: data.token });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
}