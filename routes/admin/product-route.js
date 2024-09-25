import { Router } from "express";

import { handleImageUpload, addProduct, editProduct, fetchAllProducts, deleteProduct } from "../../controllers/admin/product-controller.js";

import cloudinary from "../../helpers/cloudinary.js";

const router = Router();

router.post("/upload-image", cloudinary.upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

export default router;