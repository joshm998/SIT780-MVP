const SlicerController = require("../controllers/SlicerController");

var router = require("express").Router();

router.post("/slice", SlicerController.slice);

module.exports = router;