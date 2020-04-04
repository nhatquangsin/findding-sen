import { Router } from "express";
import fromData from 'express-form-data';

import UploadController from "../controllers/upload.controller";

const router = new Router();

router.use(fromData.parse());

router.post("/upload", (req, res) => {
    UploadController.upload(req, res);
});

export default router;
