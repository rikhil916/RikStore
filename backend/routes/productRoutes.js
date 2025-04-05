import express from "express";
import formidable from "express-formidable";

import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";

const router=express.Router();

import {
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    filterProducts,
} from "../controllers/productController.js";
import checkId from "../middlewares/checkId.js";

router
.route("/")
.post(authenticate, authorizeAdmin, formidable(), addProduct)
.get(fetchProducts)


router.route('/allproducts').get(fetchAllProducts);
router.route('/:id/reviews').post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get('/new', fetchNewProducts);

router
.route('/:id')
.get(fetchProductById)
.put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
.delete(authenticate, authorizeAdmin, removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;