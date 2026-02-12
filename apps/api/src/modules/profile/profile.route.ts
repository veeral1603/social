import { Router } from "express";
import requireAuth from "../../middlewares/requireAuth";
import profileController from "./profile.controller";
import { validate } from "../../middlewares/validate";
import {
  updateProfileSchema,
  updateUsernameSchema,
} from "../../../../../packages/shared-types/src/profile/profile.schema";
import { multerUpload } from "../../config/multer.config";
import optionalAuth from "../../middlewares/optionalAuth";

const router = Router();

router.get("/me", requireAuth, profileController.getSelfProfile); // GET /api/profile
router.patch(
  "/me",
  requireAuth,
  multerUpload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  validate(updateProfileSchema),
  profileController.updateUserProfile,
); // PATCH /api/profile
router.patch(
  "/me/username",
  requireAuth,
  validate(updateUsernameSchema),
  profileController.updateUsername,
); // PATCH /api/profile/change-username

router.get("/check-username", profileController.checkUsernameAvailability); // GET /api/profile/check-username?username=someusername
router.get("/@:username", optionalAuth, profileController.getProfileByUsername); // GET /api/profile/@:username

export default router;
