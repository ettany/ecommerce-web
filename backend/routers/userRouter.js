const userRouter = require("express").Router();
const userController = require("../controllers/userController");
const authMiddle = require("../middlewares/authMiddleware");

userRouter.get("/seed", userController.createUserSeed);

userRouter.get("/:id", userController.userProfileDetail);

userRouter.put("/profile", authMiddle.isAuth, userController.userProfileUpdate);

userRouter.get(
  "/",
  [authMiddle.isAuth, authMiddle.isAdmin],
  userController.getUsers
);

userRouter.put(
  "/:id",
  [authMiddle.isAuth, authMiddle.isAdmin],
  userController.editUser
);

userRouter.delete(
  "/:id",
  [authMiddle.isAuth, authMiddle.isAdmin],
  userController.deleteUser
);

module.exports = userRouter;
