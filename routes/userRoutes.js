const express = require('express');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');


const createUser = (req, res) => {

    let data = req.body;

    bcrypt.hash(data.password, 10, async function (err, hash) {

        const user = new User({
            username: data.username,
            role: data.role,
            password: hash
        })


        user.save().then(createdUser => {

            console.log(createdUser._id);
            if (createdUser) {
                res.status(201).json({
                    message: "User added successfully",
                    postId: createUser._id
                });

            } else {
                res.status(500).json({
                    message: "Error saving user"
                });
            }

        })

    })


}

const getAllUsers = (req, res) => {
    console.log(req.requestTime);
    User.find({},{username:1,role:1}).then(users => {
        res.status(200).json({
            message: "Users fetched successfully!",
            results: users
        });
    });
};

const getUser = (req, res) => {
    console.log(req.params);
    //const _sku = req.params.id * 1;
    const _id = req.params.id;

    User.find({ sku: _sku }).then(users => {
        res.status(200).json({
            message: "User fetched successfully!",
            users: users
        });
    });
};


const updateUser = (req, res) => {

    let data = req.body;

    return User.updateOne(
        { _id: req.params.id },
        {
            $set: {
                username: data.username,
                role: data.role,
            }

        }
    ).then(result => {
        res.status(200).json({ message: "Rim updated successfully!" });
    })


}

const updateUserPassword = (req, res) => {

    let data = req.body;

    

    bcrypt.hash(data.password, 10, async function (err, hash) {

        return User.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    password: data.hash
                }

            }
        ).then(result => {
            res.status(200).json({ message: "User password updated successfully!" });
        })

    })


}

const deleteUser = (req, res) => {
    console.log(req.params);
    //const _sku = req.params.id * 1;
    const _id = req.params.id;

    User.deleteOne({ _id: _id }).then(users => {
        console.log("deleted");
        res.status(200).json({
            message: "User deleted successfully!",
        });
    });
};


const router = express.Router();

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .patch(updateUserPassword)
    .delete(deleteUser);

module.exports = router;