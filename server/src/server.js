import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 5001;

async function start() {
  await connectDB();
  app.listen(port, () => console.log(`API running on http://localhost:${port}`));
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
