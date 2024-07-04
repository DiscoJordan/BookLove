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

  getAllUsers,
  toggleAdminRights
  
} = require("../controllers/users");

router.post("/reg", registerUser); /* trigger certain function*/
router.post("/login", loginUser);
router.post("/verify_token", verifyToken);
router.post("/update", updateUser);
router.post("/delete", deleteUser);
router.get("/get/:id", getUser);

router.get("/getall", getAllUsers);
router.post("/editList", editPlaceList);
router.post("/toggleAdmin", toggleAdminRights);

module.exports = router;
