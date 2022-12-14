const express = require('express');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtkey = process.env.JWT_KEY;
const { default: mongoose } = require('mongoose');

const createUser = (req, res) => {
    let data = req.body;
    User.exists({ username: data.username }, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Result :", doc) // true
            if (doc === null) {
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

            }else{
                res.status(200).json({
                    message: "User already exists"
                });
            }
        }
    });







}

const authenticate = (req, res) => {
    let data = req.body;
    User.findOne({ "username": data.username }).then(user => {
        if (user) {
            let passInTheDatabase = user.password;
            bcrypt.compare(data.password, passInTheDatabase, function (err, _res) {
                if (user) {
                    if (_res === false) {
                        res.send("user not found");
                    } else {
                        const payload = {
                            user: user
                        };

                        const token = jwt.sign(payload, jwtkey, {
                            expiresIn: 1440  //token expiration period
                        });
                        res.status(200).json({
                            acceso: true,
                            mensaje: 'Autenticación correcta',
                            token: token,
                            id: user._id,
                            role: user.role,
                            username: user.username
                        });


                    }
                } else {
                    res.status(401).json({
                        acceso: false,
                        mensaje: "Usuario o contraseña incorrectos"
                    });

                }

            })


        } else {

            res.json({
                status: 401,
                acceso: false,
                mensaje: "Usuario o contraseña incorrectos"
            });



        }

    }, (err, res) => {
        console.log(err);
        res.status(401).json({
            acceso: false,
            mensaje: "Usuario o contraseña incorrectos"
        });

    })
};

const getAll = (req, res) => {
    console.log(req.requestTime);
    User.find({}, { username: 1, role: 1 }).then(users => {
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
    const id = mongoose.Types.ObjectId(req.params.id);
    

    User.findByIdAndRemove(id).then(brands => {
        res.status(200).json({
            message: "User deleted successfully!",
        });
    });

/*     console.log(req.params);
    //const _sku = req.params.id * 1;
    const _id = req.params.id;

    User.deleteOne({ _id: _id }).then(users => {
        console.log("deleted");
        res.status(200).json({
            message: "User deleted successfully!",
        });
    }); */
};


const router = express.Router();

router
    .route('/')
    .get(getAll)
    .post(createUser);

router.route('/authenticate').post(authenticate);

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .patch(updateUserPassword)
    .delete(deleteUser);

module.exports = router;