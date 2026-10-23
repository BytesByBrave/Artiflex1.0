import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^https?:\/\/localhost(:[0-9]+)?$/.test(origin) || /^https?:\/\/127\.0\.0\.1(:[0-9]+)?$/.test(origin)) {
        return callback(null, true);
      }
      if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
        return callback(null, true);
      }
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 }));

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
