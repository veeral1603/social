import { Router } from "express";
import requireAuth from "../../middlewares/requireAuth";
import profileController from "./profile.controller";
import { validate } from "../../middlewares/validate";
import {
  updateProfileSchema,
  updateUsernameSchema,
} from "../../../../../packages/shared-types/src/profile/profile.schema";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.get("/me", requireAuth, profileController.getSelfProfile); // GET /api/profile
router.patch(
  "/me",
  requireAuth,
  validate(updateProfileSchema),
  multerUpload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  profileController.updateUserProfile,
); // PATCH /api/profile
router.patch(
  "/me/username",
  requireAuth,
  validate(updateUsernameSchema),
  profileController.updateUsername,
); // PATCH /api/profile/change-username

router.get("/check-username", profileController.checkUsernameAvailability); // GET /api/profile/check-username?username=someusername
router.get("/@:username", profileController.getProfileByUsername); // GET /api/profile/@:username

export default router;
