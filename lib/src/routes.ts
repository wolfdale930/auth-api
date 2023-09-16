import { Request, Response } from "express";
import { AuthController } from "./controllers/auth.controller";
import { ApiMethod } from "./enums/api-method.enum";

const statusRoutes = [
    {
        method: ApiMethod.GET,
        path: '/healthy',
        controller: (_req: Request, res: Response) => { res.send('API is working'); },
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
        controller: AuthController.login,
        isAuth: false
    },
    {
        method: ApiMethod.GET,
        path: '/confirmation',
        controller: AuthController.confirmation,
        isAuth: false
    }
];

export = [...statusRoutes, ...authRoutes];

