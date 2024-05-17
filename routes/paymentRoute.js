import express from "express";
const router = express.Router();
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createNewPayment, getAllPayments, getUserPayments } from "../controllers/paymentController.js";
import formidable from "express-formidable";

router.post("/newPayment", createNewPayment);
router.get("/getPayments/:id", getUserPayments);
router.get("/getAllPayments/", getAllPayments);

export default router;