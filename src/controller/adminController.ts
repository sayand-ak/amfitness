import { Next, Req, Res } from "../types/ExpressTypes";
import userServices from "../services/adminServices"
import { setTokenCookies } from "../utils/setTokenCookies";
import { CustomError } from "../utils/CustomError";

const login = async(req: Req, res: Res, next: Next) => {
    try {
        const response = await userServices.login(req.body);
        if(response){
            setTokenCookies(res, response.accessToken, response.refreshToken, response.user.id )
            res.status(200).json(response);
        } else {
            throw new CustomError("Login failed", 401);
        }
    } catch (error) {
        next(error);
    }
}

const addTrainee = async(req: Req, res: Res, next: Next) => {
    try {
        const response = await userServices.addTrainee(req.body);
        if(response){
            res.status(200).json(response);
        } else {
            throw new CustomError("Add trainee failed", 401);
        }
    } catch (error) {
        next(error);
    }
}

const manualPayment = async(req: Req, res: Res, next: Next) => {
    try {
        const response = await userServices.manualPayment(req.body);
        if(response){
            res.status(200).json(response);
        } else {
            throw new CustomError("Manual payment failed", 401);
        }
    } catch (error) {
        next(error);
    }
}

export default {
    login,
    addTrainee,
    manualPayment
}