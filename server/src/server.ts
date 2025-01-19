import dotenv from "dotenv";
import app from "./config/app"; 
import connectToDatabase from "./config/mongoose";

dotenv.config();

connectToDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running @ http://localhost:${PORT}`);
});
