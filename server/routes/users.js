const express = require("express");
const router = express.Router();
const {
  registerUser,
  updateUser,
  getUser,
  deleteUser,
  loginUser,
  verifyToken,
  editPlaceList,
  send_email,
  getAllUsers,
  toggleAdminRights,
} = require("../controllers/users");

const { verify_token } = require("../middlewares/authMiddleware");

router.post("/reg", registerUser); /* trigger certain function*/
router.post("/login", loginUser);
router.post("/verify_token", verifyToken);
router.post("/update", verify_token, updateUser);
router.post("/delete", deleteUser);
router.get("/get/:id", getUser);
router.post("/send_email", send_email);
router.get("/getall", getAllUsers);
router.post("/editList", editPlaceList);
router.post("/toggleAdmin", toggleAdminRights);

module.exports = router;
