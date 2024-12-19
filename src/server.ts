import dotenv from "dotenv";
import { execSync } from "child_process";
import app from "./config/app"; 
import { connectPrisma, disconnectPrisma } from "./config/prisma";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Run database migrations
    console.log("Running migrationssss...");
    execSync("npx prisma migrate deploy --schema=src/prisma/schema.prisma", { stdio: "inherit" });
    console.log("Migrations completed successfully.");

    // Connect to Prisma
    await connectPrisma();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running @ http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit process if there's an error
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Gracefully shutting down...");
  await disconnectPrisma();
  process.exit(0);
});

startServer();
