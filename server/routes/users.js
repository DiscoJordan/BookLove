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
  uploadAvatarOrPlaceCover,
  
} = require("../controllers/users");

router.post("/reg", registerUser); /* trigger certain function*/
router.post("/login", loginUser);
router.post("/verify_token", verifyToken);
router.post("/update", updateUser);
router.post("/delete", deleteUser);
router.get("/get/:id", getUser);
router.post("/upload", uploadAvatarOrPlaceCover);

router.post("/editList", editPlaceList);

module.exports = router;
