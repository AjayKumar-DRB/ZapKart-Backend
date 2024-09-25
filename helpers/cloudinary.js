import { v2 as cloudinary } from "cloudinary";
import multer, { memoryStorage } from "multer";

cloudinary.config({
  cloud_name: "dgmk7x3pk",
  api_key: "683492619862526",
  api_secret: "VDuRLf3LTonIe0q1iEaTbMBtOtw",
});

const storage = new memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

export default { upload, imageUploadUtil };