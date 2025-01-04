import { NextFunction, Response, Request } from "express";
import gymServices from "../services/gymServices";

const login = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const response = await gymServices.login(username, password);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

export = {
    login
}