import express from "express";
import errorMiddleware from "../middleware/error";
import gymRoutes from "../routes/gymRoutes";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/ping", (req, res) => {
    res.send("pong");
});

app.use("/api/v1/gym", gymRoutes);

app.use(errorMiddleware)

export default app;
