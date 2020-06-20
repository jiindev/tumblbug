import { Request, Response, Router } from "express";
const { addresses } = require("../data/addresses.json");
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const lastId = parseInt("" + req.query.lastId, 10);
  const realLastIndex = addresses.findIndex((v: any) => v.id === lastId);
  const moreAddresses = addresses.slice(realLastIndex + 1, realLastIndex + 6);
  let hasMoreAddresses = true;
  if (
    moreAddresses[moreAddresses.length - 1].id ===
    addresses[addresses.length - 1].id
  ) {
    hasMoreAddresses = false;
  }
  return res.json({ addresses: moreAddresses, hasMoreAddresses });
});
router.post("/", async (req: Request, res: Response) => {
  return res.send("post");
});
router.delete("/", async (req: Request, res: Response) => {
  return res.send("delete");
});

export default router;
