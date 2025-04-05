import path from 'path';
import express from 'express';
import multer from 'multer';
// import fs from 'fs';

const router=express.Router();

// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    },
});

const fileFilter = (req, file, cb) => {
    try {
        const filetypes = /jpe?g|png|webp/;
        const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
    
        const extname = path.extname(file.originalname).toLowerCase();
        const mimetype = file.mimetype;
    
        if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true);
        } else {
        cb(new Error("Only JPEG, PNG, and WEBP images are allowed"),false);
        }
    } catch (error) {
        cb(new Error("File upload error"));
    }
    };

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

router.post("/", (req, res) => {
    uploadSingleImage(req, res, (err) => {
    if (err) {
        res.status(400).send({ message: err.message });
    } 
    if (!req.file) {
        return res.status(400).send({ message: "No image file provided" });
    }
    res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`, 
    });
    });
});

export default router;