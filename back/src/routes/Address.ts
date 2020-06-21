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
      const moreAddresses = addressesData.slice(lastId, lastId + 5);
      let hasMoreAddresses = true;
      if (
        moreAddresses.length < 1 ||
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
  fs.readFile(addressesFile, "utf8", (err: any, data: any) => {
    try {
      let parsedData = JSON.parse(data);
      const nextId =
        Math.max(...parsedData.addresses.map((address: any) => address.id)) + 1;
      const newData = {
        id: nextId,
        postnumber: req.body.postnumber,
        name: req.body.name,
        address: req.body.address,
      };
      parsedData.addresses.unshift(newData);
      fs.writeFile(addressesFile, JSON.stringify(parsedData), (err: any) => {
        if (err) throw err;
        res.json(newData);
      });
    } catch (err) {
      console.error(err);
    }
  });
});
router.delete("/:id", async (req: Request, res: Response) => {
  const deleteId = parseInt("" + req.params.id, 10);
  fs.readFile(addressesFile, "utf8", (err: any, data: any) => {
    try {
      let parsedData = JSON.parse(data);
      let index = parsedData.addresses.findIndex((v: any) => v.id === deleteId);
      parsedData.addresses.splice(index, 1);

      fs.writeFile(addressesFile, JSON.stringify(parsedData), (err: any) => {
        if (err) throw err;
        return res.send(req.params.id);
      });
    } catch (err) {
      console.error(err);
    }
  });
});
router.get("/default", async (req: Request, res: Response) => {
  const defaultFile = path.join(__dirname, "..", "data", "default.json");
  fs.readFile(defaultFile, "utf8", (err: any, data: any) => {
    try {
      const defaultData = JSON.parse(data).defaultAddressId;
      return res.json(defaultData);
    } catch (err) {
      console.error(err);
    }
  });
});
router.put("/default", async (req: Request, res: Response) => {
  const defaultFile = path.join(__dirname, "..", "data", "default.json");
  fs.readFile(defaultFile, "utf8", (err: any, data: any) => {
    try {
      const defaultData = JSON.parse(data);
      defaultData.defaultAddressId = req.body.data;

      fs.writeFile(defaultFile, JSON.stringify(defaultData), (err: any) => {
        if (err) throw err;
        return res.json(req.body.data);
      });
    } catch (err) {
      console.error(err);
    }
  });
});

export default router;
