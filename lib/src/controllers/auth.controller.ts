import { RegisterRequest } from "../interfaces/register-request.interface";
import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";

export class AuthController {

    static async register(request: Request, response: Response) {
        const body: RegisterRequest = request.body;
        response.send(await AuthService.registerUser(body, request));
    }

    static async login(request: Request, response: Response) {
        const body: RegisterRequest = request.body;
        response.send(await AuthService.loginUser(body, request));
    }

    static async confirmation(request: Request, response: Response) {
        const token = request.query?.token as string;
        response.send(await AuthService.confirmUser(token, request));
    }

}