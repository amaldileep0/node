var express = require('express')
var app = express()
var router = express.Router()
var passport = require('passport');
var accountController = require('../controllers/accountController')
var userController = require('../controllers/userController');
var authMiddleware = require('../middlewares/authMiddleware');

 var isAuthenticated =  (req, res, next) => {
    if (req.user){
        res.redirect('/index')
    } else {
        next()
    }
}

app.use(isAuthenticated)


router.get('/', isAuthenticated, (req, res, next) => {res.redirect('/login')})
router.get('/login', isAuthenticated,(req, res, next) => {accountController.login(req, res, next);});
router.post('/login', passport.authenticate('local', {failureRedirect: '/failure', successRedirect: '/index' }));
router.get('/logout', (req, res) => {req.logout();res.redirect('/');});
router.get('/forgotPassword',(req, res, next) => {accountController.forgotPassword(req, res, next)});
router.get('/account/getValidationRules/:page', (req, res, next) => {accountController.getRules(req, res, next);})
router.get('/failure',(req, res, next) => {
    req.flash('error', 'Invalid username or password');
    res.redirect('/login')
});

router.get('/index',authMiddleware.isAuthenticated , accountController.index);
router.get('/users',authMiddleware.isAuthenticated, userController.listUsers);
router.get('/user/getUserDataForUpdate',authMiddleware.isAuthenticated, (req, res, next) => {
    var isAjaxRequest = req.xhr;
    if(isAjaxRequest) {
        userController.ajaxGetUserDataForUpdate(req, res, next)
    } else {
        res.status(400).send('Bad Request');
    }
});
router.post('/user/editUser',authMiddleware.isAuthenticated,(req,res,next) =>{
    userController.updateUser(req,res,next);
})

module.exports = router