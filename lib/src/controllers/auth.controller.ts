import { RegisterRequest } from "../interfaces/register-request.interface";
import { Response as Res } from "../interfaces/response.interface";
import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";

export class AuthController {

    static async register(request: Request, response: Response) {
        const body: RegisterRequest = request.body;
        response.send(await AuthService.registerUser(body));
    }

    static login(): boolean {
        return false;
    }

}