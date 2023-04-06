const {
  register,
  getAllUsers,
  setProfilePic,
} = require("../controllers/userControllers");
const { login } = require("../controllers/userControllers");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

// user route to get all users on clients screen
router.get("/allusers/:id", getAllUsers);

router.post("/setprofilepic", setProfilePic);

module.exports = router;
