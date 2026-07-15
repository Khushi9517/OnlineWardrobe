import { Router } from "express";

import { protect } from "../../middleware/protect";
import { getCurrentUser } from "./user.controller";

const router = Router();

router.get("/me", protect, getCurrentUser);

export default router;