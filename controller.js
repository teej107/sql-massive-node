/**
 * Created by tanner on 3/18/17.
 */
var db = require('./index').get('db');
module.exports = {
    createProduct: function (req, res)
    {
        var name = req.body.name;
        var description = req.body.description;
        var price = req.body.price;
        var imageUrl = req.body.imageUrl;

        if (!(name && description))
        {
            res.status(400).send({error: "'name' or 'description' not present"});
            return;
        }
        if (isNaN(price))
        {
            res.status(400).send({error: "'price' must be numeric"});
            return;
        }
        db.create_product([name, description, price, imageUrl], (err, product) =>
        {
            res.send();
        });
    },
    readProducts: function (req, res)
    {
        db.read_products((err, products) =>
        {
            res.send(products);
        });
    },
    readProduct: function (req, res)
    {
        var name = req.query.name;
        if (!name)
        {
            res.status(400).send({error: "'name' is not present"});
            return;
        }
        db.read_product([name], (err, product) =>
        {
            res.send(product);
        });
    },
    updateProduct: function (req, res)
    {
        var name = req.body.name;
        var description = req.body.description;
        if (!(name && description))
        {
            res.status(400).send({error: "'name' or 'description' not present"});
            return;
        }
        db.read_product([name], (err, product) =>
        {
            if (Object.keys(product).length === 1)
            {
                db.update_product([name, description], (err, product) =>
                {
                    res.send();
                });
            }
            else
            {
                res.status(400).send({error: 'product not found'})
            }
        });
    },
    deleteProduct: function (req, res)
    {
        var name = req.query.name;
        if (!name)
        {
            res.status(400).send();
            return;
        }
        db.delete_product([name],(err, product) =>
        {
            res.send();
        });
    }
};