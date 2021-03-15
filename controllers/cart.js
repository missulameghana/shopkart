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

exports.post_test = (req,res_main,next) => {
    console.log("buy button pressed");
    var credit;
    const q1= 'select credit from users';
    const q2 = 'select coalesce(sum(c.quantity*p.price), 0) from cart c, products p where c.item_id = p.id';
    
    pool.query(q1, (err, credit_res) => {
        if(err) {
            console.log(err);
            return;
        }
        pool.query(q2 , (err, price_res) => {
            if(err) {
                console.log(err);
                return;
            }
            // console.log(price_res.rows[0].coalesce);
            if(price_res.rows[0].coalesce > credit_res.rows[0].credit) {
                res_main.redirect("/cart");
            }
            const q3 = 'insert into orders(user_id, item_id, quantity) select c.user_id, c.item_id, c.quantity from cart c on conflict (user_id, item_id) do update set quantity = (orders.quantity + (select c2.quantity from cart c2 where (orders.user_id, orders.item_id) = (c2.user_id, c2.item_id)));';
            const q4 = 'delete from cart';
            const q5 = 'update users set credit = $1 where user_id =1 ;';
            const dec = credit_res.rows[0].credit - price_res.rows[0].coalesce;
            console.log("diff: ", dec);

            pool.query('BEGIN', err => {
                if(err) {
                    console.log("c1");
                    return;
                }
                pool.query(q3, (err, res) => {
                    if(err) {
                        console.log("c2");
                        return;
                    }
                    pool.query(q4, (err, res) => {
                        if(err) {
                            console.log("c3");
                            return;
                        }
                        pool.query(q5, [dec], (err, res) => {
                            if(err) {
                                console.log("c4");
                                return;
                            }
                            pool.query('COMMIT', err => {
                                if(err){
                                    console.log("c5");
                                    return;
                                }
                                else{
                                    console.log("c6");
                                    res_main.redirect("/orders");
                                }
                            })
                        })

                    })
                })
            })

        });

    });
};
 

    