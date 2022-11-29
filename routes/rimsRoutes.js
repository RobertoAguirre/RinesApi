const express = require('express');
const Rim = require('../models/rim.js');


//const rims = JSON.parse();

const getAllRims = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: rims.length,
        data: {
            rims
        }
    });
}

const getRim = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const rims = rims.find(el => el.id === id);
    if (!rims) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            rim
        }
    });
}

const createRim = (req, res) => {

    let data = req.body;

    const rim = new Rim({
        sku: data.sku,
        modelname: data.modelname,
        description: data.description,
        brand: data.brand
    });

    rim.save().then(createdRim => {

        console.log(createdRim._id);
        if (createRim) {
            res.status(201).json({
                message: "Rim added successfully",
                postId: createRim._id
            });

        }else{
            res.status(500).json({
                message: "Error saving rim"
            });
        }

    })




}

const updateRims = (req, res) => {
    if (req.params.id * 1 > rims.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }
    res.status(200).json({
        status: 'success',
        data: '<Updated rim here...>'
    });
}



const deleteRim = (req, res) => {
    if (req.params.id * 1 > rims.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
}


const router = express.Router();

router
    .route('/')
    .get(getAllRims)
    .post(createRim);

router
    .route('/:id')
    .get(getRim)
    .patch(updateRims)
    .delete(deleteRim);

module.exports = router;

