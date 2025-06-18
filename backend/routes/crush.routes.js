import { Router } from "express";
import {
  addCrush,
  deleteCrush,
  getAllCrushes,
  getCrushById,
  updateCrush,
} from "../controllers/crush.controller.js";

const router = Router();

router.route("/").post(addCrush).get(getAllCrushes);

router.route("/:id").get(getCrushById).put(updateCrush).delete(deleteCrush);

export default router;
