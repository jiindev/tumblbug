import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
const cors = require("cors");
import express, { Request, Response } from "express";
import "express-async-errors";

import addressAPIRouter from "./routes/Address";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.get("/", (req: Request, res: Response) => {
  res.send("정상 동작");
});
app.use("/api/address", addressAPIRouter);

export default app;
