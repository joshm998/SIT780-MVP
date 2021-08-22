var router = require("express").Router();
const viewController = require('../controllers/viewController')
const isAuthenticated = require('../helpers/authHelper');

router.get('/login', viewController.loginPage);
router.get('/register', viewController.registerPage);
router.get('/add', isAuthenticated, viewController.addPage);
router.get('/model', isAuthenticated, viewController.modelPage);
router.get('/', isAuthenticated, viewController.modelsPage);

module.exports = router;