const passport = require("passport");
const router = require('express').Router();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}


router.get('/', (req, res) => {
    if (req.user) {
        res.send(`Hello ${ req.user.name }`);
    }
    res.render('index')
});


router.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));


router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/failure'
    }));

router.get('/protected', isLoggedIn, (req, res) => {
    res.render('protected', { name: req.user.name });
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('<a href="/">Go Home</a>');
});

router.get('/failure', (req, res) => {
    res.send('Failure')
});

module.exports = router
