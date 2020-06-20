import { Request, Response, Router } from "express";
const router = Router();
const path = require("path");
const fs = require("fs");
const addressesFile = path.join(__dirname, "..", "data", "addresses.json");

router.get("/", async (req: Request, res: Response) => {
  const lastId = parseInt("" + req.query.lastId, 10);
  fs.readFile(addressesFile, "utf8", (err: any, data: any) => {
    try {
      const addressesData = JSON.parse(data).addresses;
      const index = addressesData.findIndex((v: any) => v.id === lastId);
      const moreAddresses = addressesData.slice(index + 1, index + 6);
      let hasMoreAddresses = true;
      if (
        moreAddresses[moreAddresses.length - 1].id ===
        addressesData[addressesData.length - 1].id
      ) {
        hasMoreAddresses = false;
      }
      return res.json({ addresses: moreAddresses, hasMoreAddresses });
    } catch (err) {
      console.error(err);
    }
  });
});
router.post("/", async (req: Request, res: Response) => {
  return res.send("post");
});
router.delete("/:id", async (req: Request, res: Response) => {
  const deleteId = parseInt("" + req.params.id, 10);
  fs.readFile(addressesFile, "utf8", (err: any, data: any) => {
    let parsedData = JSON.parse(data);
    let index = parsedData.addresses.findIndex((v: any) => v.id === deleteId);
    parsedData.addresses.splice(index, 1);

    fs.writeFile(addressesFile, JSON.stringify(parsedData), (err: any) => {
      if (err) throw err;
      console.log("바꿨음 ㅎ");
      res.send(req.params.id);
    });
  });
});

export default router;
