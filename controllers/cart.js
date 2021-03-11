const Prod = require('../models/prod');
const pool = require('../utils/database');
exports.get_test = (req,res,next) => {
    pool.query('select title, image, price, cart.quantity from products,cart where products.id=cart.item_id', (err,result)=>{
        if(err){console.log(err);}
        else{
    pool.query('select credit from users', (err2,result2)=>{
        if(err2){console.log(err2);}
        else{
            res.render('cart', {
                pageTitle: 'Cart',
                path: '/cart',
                cartData: result.rows,
                cartCredits: result2.rows
            });
        }});}
        
    });


};

exports.post_test = (req,res,next) => {
    // const title = req.body.title;
    // const image = req.body.image
    // const price = req.body.price;
    // const quantity = req.body.quantity;
    // const product = new Prod( title, image, price,quantity);
    // product
    //     .add_prod()
    //     .then(() => {
    //         res.redirect('/cart');
    //     })
    //     .catch(err => console.log(err));
};