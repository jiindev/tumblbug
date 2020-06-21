import morgan from "morgan";
const cors = require("cors");
import express, { Request, Response } from "express";
import "express-async-errors";

import addressAPIRouter from "./routes/Address";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  res.send("정상 동작");
});
app.use("/api/address", addressAPIRouter);

app.listen(8000, () => {
  console.log("Express server started on port: 8000");
});
