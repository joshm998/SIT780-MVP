const isAuthenticated = require('../helpers/authHelper');
const SlicerController = require("../controllers/slicerController");
const AuthController = require("../controllers/authController");

var router = require("express").Router();

router.post("/slice", SlicerController.slice);
router.post("/register", AuthController.register);
router.get("/logout", isAuthenticated, AuthController.logout);
router.post("/login", AuthController.login);

module.exports = router;