const authRouter = require("express").Router();
const authMiddle = require('../middlewares/authMiddleware')
const authController = require("../controllers/authController");

// authRouter.get("/seed", authController.createUserSeed);

authRouter.post("/register", authController.register);
authRouter.post("/activation", authController.activateEmail);
authRouter.post("/login", authController.login);
authRouter.post("/refresh_token", authController.getAccessToken);
authRouter.post("/forgot", authController.forgotPassword);
authRouter.post("/reset", authMiddle.isAuth, authController.resetPassword);
authRouter.get("/infor", authMiddle.isAuth, authController.getUserInfor);
// authRouter.get("/all_infor", auth, authAdmin, authController.getUsersAllInfor);
authRouter.get("/logout", authController.logout);

// Social Login
authRouter.post("/google_login", authController.googleLogin)
// authRouter.post("/facebook_login", authController.facebookLogin)

module.exports = authRouter