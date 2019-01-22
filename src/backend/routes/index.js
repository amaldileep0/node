var express = require('express')
var app = express()
var router = express.Router()
var passport = require('passport');
var accountController = require('../controllers/accountController')
var authMiddleware = require('../middlewares/authMiddleware');

 var isAuthenticated =  (req, res, next) => {
    if (req.user){
        res.redirect('/index')
    } else {
        next()
    }
}

app.use(isAuthenticated)

/**
 * Route to main page
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
router.get('/', isAuthenticated, (req, res, next) => {
    res.redirect('/login')
})

/**
 * GET login page.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
router.get('/login', isAuthenticated,(req, res, next) => {
    accountController.login(req, res, next);
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/failure', successRedirect: '/index' }));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

/**
 * get validation rules
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
router.get('/account/getValidationRules/:page', (req, res, next) => {
    accountController.getRules(req, res, next);
})

/**
 * login validation
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
router.get('/failure',(req, res, next) => {
    req.flash('error', 'Invalid username or password');
    res.redirect('/login')
});

/**
 * GET index page.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
router.get('/index',authMiddleware.isAuthenticated ,accountController.index);

module.exports = router