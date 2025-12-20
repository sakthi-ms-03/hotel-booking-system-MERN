import express from "express";
import { createReservation, getReservationsByUserId, getUserReservations } from "../controllers/reservation.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyUser, createReservation);
router.get("/my", verifyUser, getUserReservations);
router.get("/user/:userId", verifyAdmin, getReservationsByUserId);

export default router;
