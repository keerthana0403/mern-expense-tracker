import express from "express";
import {
  addRecord,
  deleteRecord,
  fetchRecords,
  updateRecord,
} from "../controllers/expense.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/getAllByUserId", protectRoute, fetchRecords);

router.post("/", protectRoute, addRecord);

router.put("/:recordId", protectRoute, updateRecord);

router.delete("/:recordId", protectRoute, deleteRecord);

export default router;
