const express = require("express");

const {
  validateBody,
  authenticate,
  upload,
  // resizeAvatar,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/avatars",
  authenticate,
  //  resizeAvatar,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
