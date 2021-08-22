const slicedModel = require("../models/slicedModel");

module.exports = {

    /**
     * Login Page
     * @param req
     * @param res
     * @param next
     */
    loginPage: (req, res, next) => {
        res.render('login', { message: req.query.message });
    },

        /**
     * Login Page
     * @param req
     * @param res
     * @param next
     */
    registerPage: (req, res, next) => {
        res.render('register');
    },

     /**
     * Index Page
     * @param req
     * @param res
     * @param next
     */
    index: (req, res, next) => {
        res.render('gcode', {gcode: "test"});
    },

    /**
     * Add Page
     * @param req
     * @param res
     * @param next
     */
     addPage: (req, res, next) => {
        res.render('add');
    },

     /**
     * Models Page
     * @param req
     * @param res
     * @param next
     */
    modelsPage: (req, res, next) => {
        slicedModel.find({ ownerId: req.user.id })
            .then((result) => {
                res.render('list', {models: result});
            })
            .catch((err) => {
                console.error(err);
            });
    },

         /**
     * Models Page
     * @param req
     * @param res
     * @param next
     */
    modelPage: (req, res, next) => {
        slicedModel.find({ _id: req.query.id })
            .then((result) => {
                res.render('gcode', { gcode: `data:text/plain;charset=utf-8;base64,${result[0].gcode}` });
            })
            .catch((err) => {
                console.error(err);
            });
    }
}