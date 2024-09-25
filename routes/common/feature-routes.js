import { Router } from "express";

import { addFeatureImage, getFeatureImages } from "../../controllers/common/feature-controller.js";

const router = Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);

export default router;