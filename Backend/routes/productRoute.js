const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, singleProductDetails, 
    createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const router= express.Router();
const {isAuthenticatedUser,authorizeRoles}= require("../middlewares/auth");

router.get("/products",getAllProducts);
router.post("/admin/products/new",isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.get("/admin/products",isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);
router.put("/admin/products/:id",isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.delete("/admin/product/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.get("/products/:id",singleProductDetails);
router.put("/review",isAuthenticatedUser,createProductReview);
router.get("/reviews",getProductReviews);
router.delete("/reviews",isAuthenticatedUser,deleteReview);

module.exports =router;