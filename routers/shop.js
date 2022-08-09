const express = require('express');
const router = express.Router();

router.get('/shop/:id', (req, res) => {
    res.render('shop', { category: [req.params.id], navbar: true, user:req.user });
});

router.get('/shop', (req, res) => {
    res.render('shop', { navbar: true, user: req.user });
})

module.exports = router;