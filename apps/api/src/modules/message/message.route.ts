import { Router } from "express";
import messageController from "./message.controller";
import { validate } from "../../middlewares/validate";
import { messageInputSchema } from "@repo/shared-types";

const router = Router();

router.post("/", validate(messageInputSchema), messageController.createMessage);
router.delete("/:messageId", messageController.deleteMessage);

export default router;
