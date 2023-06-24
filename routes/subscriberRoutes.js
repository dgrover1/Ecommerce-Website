import express from "express";
import { subController } from "../controllers/subController.js";

const router = express.Router();


router.post('/sub', subController);


export default router;
