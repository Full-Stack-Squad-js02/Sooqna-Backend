'use strict';

const {
    users,
    productTabel,
} = require("../models/index-model");



//GET All users
async function getUsersAdmin(req, res, next) {
    if (req.user.role == "admin") {
        try {
            const userRecords = await users.findAll({});
            const list = userRecords.map(user => user);
            res.status(200).json(list);
        } catch (e) {
            next(e.message);
        }
    } else {
        res.send("you are not admin");
    }
}



//DELETE users
async function deleteUsers(req, res) {
    const id = req.params.id;
    if (req.user.role == "admin") {
        let deletedRecord = await users.destroy({
            where: {
                id
            }
        });
        if (deletedRecord == 1) {
            res.status(204).send(`user with id ${id} is deleted Successfully`);
        } else {
            res.status(403).send("deleted process is falied");
        }
    } else {
        res.send("you are not admin");

    }
}

//Get All Products
async function getProductAdmin(req, res, next) {
    if (req.user.role == "admin") {
        try {
            const productRecords = await productTabel.findAll({});
            const list = productRecords.map(product => product);
            res.status(200).json(list);
        } catch (e) {
            next(e.message);
        }
    } else {
        res.send("you are not admin");
    }
}


//DELETE One Product
async function deleteOneProduct(req, res) {
    const id = req.params.id;
    if (req.user.role == "admin") {
        let deletedRecord = await productTabel.destroy({
            where: {
                id
            }
        });
        if (deletedRecord == 1) {
            res.status(204).send(`product with id ${id} is deleted Successfully`);
        } else {
            res.status(403).send("deleted process is falied");
        }
    } else {
        res.send("you are not admin");
    }
}


module.exports = {
    deleteUsers,
    getUsersAdmin,
    getProductAdmin,
    deleteOneProduct
};