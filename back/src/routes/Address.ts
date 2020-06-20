import { Request, Response, Router } from "express";
const { addresses } = require("../data/addresses.json");
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  return res.send(addresses);
});
router.post("/", async (req: Request, res: Response) => {
  return res.send("post");
});
router.delete("/", async (req: Request, res: Response) => {
  return res.send("delete");
});

export default router;
