import { Req, Res, Next } from '../types/ExpressTypes'
import gymServices from "../services/gymServices";

const login = async(req: Req, res: Res, next: Next) => {
    try {
        const { username, password } = req.body;
        const response = await gymServices.login(username, password);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

const addTrainee = async (req: Req, res: Res, next: Next) => {
    try {
        const traineeData = req.body;
        console.log(traineeData)
        const response = await gymServices.addTrainee(traineeData);
        console.log(response)
        res.status(201).json({
            success: true,
            message: response.message,
            data: response.trainee,
        });
    } catch (error) {
        next(error);
    }
};

const viewTrainees = async(req: Req, res: Res, next: Next) => {
    try {
        const response = await gymServices.viewTrainees();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export default {
    login,
    addTrainee,
    viewTrainees
}