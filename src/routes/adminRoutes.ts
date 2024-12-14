import express from "express";
import userController from "../controller/adminController";
import { validateTrainee } from "../validator/trainee";
import { validateRequest } from "../middleware/validateRequest";

const router = express.Router();

router.post("/login", userController.login)

router.post("/add-trainee", validateTrainee, validateRequest, userController.addTrainee);

router.post('/payment/manual', userController.manualPayment);

export default router;
