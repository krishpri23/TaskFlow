const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// '/' denotes the parent route 'users'
router
  .route("/")
  .get(userController.getUsers)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
