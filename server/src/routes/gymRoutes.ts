import express from "express";

const gymRoutes = express.Router();

import gymControllers = require("../controllers/gymControllers");

gymRoutes.post("/login", gymControllers.login);


export default gymRoutes;