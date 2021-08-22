const passport = require('passport');
const db = require('../config/db');
const { userSchema } = require('../models/userModel');
module.exports = {

    /**
     * Login
     * @param req
     * @param res
     * @param next
     */
    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.redirect(`/login?message=${info.message}`);
            }

            req.logIn(user, () => {
                if (err) {
                    return next(err);
                }

                return res.redirect('/');
            });
            return null;
        })(req, res, next);
    },
    /**
     * Logout
     * @param req
     * @param res
     * @param next
     */
    logout: (req, res, next) => {

        req.logout();
        res.redirect('/login');
    },
    /**
     * Register
     * @param req
     * @param res
     * @param next
     */
     register: (req, res, next) => {

        const { username, password } = req.body;

        const UserDetails = db.model('User', userSchema);

        UserDetails.register({ username, active: false }, password);
        res.redirect("/login?message=Registration complete please login")
    }


}