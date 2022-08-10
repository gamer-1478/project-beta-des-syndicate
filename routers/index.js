const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.user);
    res.render('landing', {user: req.user});
});

router.get('/cart', (req, res)=>{
    res.render('cart', {user: req.user, navbar: true});
})

router.get('/dashboard', (req, res) => {
    res.render('profile', { user: req.user, navbar: true });
})


module.exports = router;