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

const { verify_token,verify_tokenAdmin } = require("../middlewares/authMiddleware");

router.post("/reg", registerUser); 
router.post("/login", loginUser);
router.post("/verify_token", verifyToken);
router.post("/update", verify_token, updateUser);
router.post("/delete", verify_tokenAdmin, deleteUser);
router.get("/get/:id", getUser);
router.post("/send_email",verify_token, send_email);
router.get("/getall",verify_tokenAdmin,getAllUsers);
router.post("/editList",verify_token, editPlaceList);
router.post("/toggleAdmin",verify_tokenAdmin, toggleAdminRights);

module.exports = router;
