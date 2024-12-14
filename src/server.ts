import dotenv from "dotenv";
import connectDB from "./config/database";
import app from "./config/app";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
