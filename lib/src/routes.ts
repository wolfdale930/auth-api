import { Request, Response } from "express";
import { AuthController } from "./controllers/auth.controller";
import { ApiMethod } from "./enums/api-method.enum";

const statusRoutes = [
    {
        method: ApiMethod.GET,
        path: '/healthy',
        controller: (req: Request, res: Response) => { res.send('API is working'); },
        isAuth: false
    },
];

const authRoutes = [
    {
        method: ApiMethod.POST,
        path: '/register',
        controller: AuthController.register,
        isAuth: false
    },
    {
        method: ApiMethod.POST,
        path: '/login',
        controller: AuthController.register,
        isAuth: false
    }
];

export = [...statusRoutes, ...authRoutes];

