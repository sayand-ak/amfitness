import express from "express";
import userRoutes from "../routes/adminRoutes";
import errorMiddleware from "../middleware/error";

const app = express();

app.use(express.json());

app.use("/ping", (req, res) => {
    res.send("pong");
});

app.use("/api/admin", userRoutes);

app.use(errorMiddleware)

export default app;
