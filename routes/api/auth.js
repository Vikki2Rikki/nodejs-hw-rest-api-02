const express = require("express");

const {
  validateBody,
  authenticate,
  upload,
  resizeAvatar,
  isSingleFileExist,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.veryfyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  isSingleFileExist,
  resizeAvatar,
  ctrl.updateAvatar
);

module.exports = router;
