const Prod = require('../models/prod');
const pool = require('../utils/database');
exports.get_test = (req,res,next) => {
    pool.query('select * from products', (err,result)=>{
        if(err){console.log(err);}
        else{
            res.render('prods', {
                pageTitle: 'All Products',
                path: '/prods',
                prodData: result.rows
            });
        }
        
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