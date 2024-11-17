"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const developmentEnv_1 = require("../helpers/developmentEnv");
cloudinary_1.v2.config({
    cloud_name: developmentEnv_1.CLOUDINARY_CLOUD_NAME,
    api_key: developmentEnv_1.CLOUDINARY_API_KEY,
    api_secret: developmentEnv_1.CLOUDINARY_API_SECRET,
});
exports.storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (req, file) => {
        const fileFormat = file.mimetype.split('/')[1];
        return {
            folder: 'uploads',
            format: fileFormat,
            public_id: file.originalname.split('.')[0],
        };
    },
});
//# sourceMappingURL=cloudinary.js.map