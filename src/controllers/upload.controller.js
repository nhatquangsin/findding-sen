import cloudinary from 'cloudinary';

import cloudinaryConfig from '../config/cloudinary';
import {UPLOAD_SUCCESS} from "../messages/upload.message";

const UploadController = {};

cloudinary.config(cloudinaryConfig);

UploadController.upload = async (req, res) => {
    try {
        const values = Object.values(req.files);
        const results = [];

        for (const image of values) {
            const result = await cloudinary.uploader.upload(image.path);
            results.push(result);
        }

        res.status(200).send({
            message: UPLOAD_SUCCESS,
            dataList: results,
        });
    } catch (err) {
        res.send(err);
    }
};

export default UploadController;
