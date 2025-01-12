import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";

interface GymController {
  login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  addTrainee: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  viewTrainees: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
// Import your controllers with the correct type
import gymControllers from "../controllers/gymControllers";

const gymRoutes: Router = express.Router();

const typedControllers = gymControllers as GymController;

gymRoutes.post("/login", typedControllers.login);

gymRoutes.route("/trainees")
    .post(typedControllers.addTrainee)
    .get(typedControllers.viewTrainees)


export default gymRoutes;