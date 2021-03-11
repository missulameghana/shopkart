
const pool= require('../utils/database');
module.exports = class Cart{

    constructor( user_id, item_id, quantity){
        this.user_id = user_id;
        this.item_id = item_id;
        this.quantity = quantity;
    }

    add_prod_cart(){
        return pool.query('INSERT INTO cart(user_id, item_id, quantity) VALUES ($1, $2, $3);', [this.user_id, this.item_id, this.quantity]);
    }
    static get_all(){
        return pool.query('SELECT * FROM cart');

    }

};