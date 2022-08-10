const express = require('express');
const router = express.Router();


var shoplist = [[{
    id: 1,
    name: 'Gamer Series 14',
    image: 'https://cdn.discordapp.com/attachments/1005877818586038424/1006489760707133513/untitled.png',
    description: 'Men\'s Running Shoe',
    price: '$9.99'
}, {
    id: 2,
    name: 'Gamer Series 78',
    image: 'https://cdn.discordapp.com/attachments/1005877818586038424/1006489759666950154/ani.png',
    description: 'Men\'s gaming Shoe',
    price: '$12.99'
}, {
    id: 3,
    name: 'Zap Series 74',
    image: 'https://cdn.discordapp.com/attachments/1005877818586038424/1006489761105588244/1.png',
    description: 'Newer model of the zap series',
    price: '$24.99'
}], [{
    id: 4,
    name: 'Zap Series 14',
    image: 'https://cdn.discordapp.com/attachments/1005877818586038424/1006489760707133513/untitled.png',
    description: 'Specially Made for running at zap speed',
    price: '$29.99'
}, {
    id: 5,
    name: 'soft wear Series 14',
    image: 'https://cdn.discordapp.com/attachments/1005877818586038424/1006489760182833193/ok.png',
    description: 'Everyone\'s soft Running Shoe',
    price: '$99.99'
}, {
    id: 6,
    name: 'Hard Wear Series 78',
    image: 'https://cdn.discordapp.com/attachments/1005877818586038424/1006489759666950154/ani.png',
    description: 'Everyone\'s Hard Running Shoe',
    price: '$69.42'
}]]

router.get('/shop/:id', (req, res) => {
    res.render('shop', { category: [req.params.id], navbar: true, user: req.user, shoplist: shoplist });
});

router.get('/shop', (req, res) => {
    res.render('shop', { navbar: true, user: req.user, shoplist: shoplist });
})

router.get('/shop-item', (req, res) => {
    if (req.query.id) {
        for (i in shoplist) {
            for (j in shoplist[i]) {
                console.log(shoplist[i][j].id);
                if (shoplist[i][j].id == req.query.id) {
                    console.log(shoplist[i][j])
                    return res.render('shop-item', { item: shoplist[i][j], navbar: true, user: req.user });
                }
            };
        };
    } else {
        res.redirect('/shop');
    }
})

module.exports = router;