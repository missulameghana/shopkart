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

exports.post_test = (req,res_main,next) => {
    const prod_id = req.body.product_id;
    pool.query('select * from products where id = $1 and quantity > 0', [prod_id], (err, res) =>{
        if(err) { 
            console.log(err);
        }
        else{
            if (res.rows.length == 0) { // item-inventory zero
                res_main.redirect("/prods");
                return;
            }
            else { // item-inventory not zero
                const q1 = 'insert into cart(user_id, item_id, quantity) values(1, $1, 1) on conflict (user_id, item_id) do update set quantity = cart.quantity+1';
                const q2 = 'update products set quantity = (products.quantity -1) where id = $1';

                pool.query('BEGIN', // begin atomic transaction
         err => {
             if (err) {
                 return;
             }
             pool.query(q1, [prod_id], (err, res) =>{ // add to cart form user id = 1
                 if (err) {
                     return;
                 }
                 pool.query(q2,[prod_id], (err, res) => { //  update inventory
                     if(err) {
                         return;
                     }

                     pool.query('COMMIT', err => {
                         if(err) {
                             console.log(err);
                         }
                         else{
                            res_main.redirect('/cart');
                         }
                     });
                 });
             });
        
     }); 

            }
            
        }
    })
};
    
    
   