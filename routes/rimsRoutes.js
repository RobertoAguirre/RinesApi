const express = require('express');
const Rim = require('../models/rim.js');


//const rims = JSON.parse();

const getAllRims = (req, res) => {
    console.log(req.requestTime);
    Rim.find().then(rims => {
        res.status(200).json({
            message: "Rims fetched successfully!",
            results: rims
        });
    });
}

const getRim = (req, res) => {
    console.log(req.params);
    //const _sku = req.params.id * 1;
    const _sku = req.params.sku;

    Rim.find({ sku: _sku }).then(rims => {
        res.status(200).json({
            message: "Rims fetched successfully!",
            rims: rims
        });
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

        } else {
            res.status(500).json({
                message: "Error saving rim"
            });
        }

    })




}

const updateRim = (req, res) => {
    /*   if (req.params.id * 1 > rims.length) {
          return res.status(404).json({
              status: 'fail',
              message: 'invalid id'
          })
      }
      res.status(200).json({
          status: 'success',
          data: '<Updated rim here...>'
      }); */
    let data = req.body;  

    return Rim.updateOne(
        { sku: req.params.sku },
        {
            $set: {
                sku: data.sku,
                modelname: data.modelname,
                description: data.description,
                brand: data.brand
            }

        }
    ).then(result => {
        res.status(200).json({ message: "Rim updated successfully!" });
    })
}



const deleteRim = (req, res) => {
    /*     if (req.params.id * 1 > rims.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'invalid id'
            })
        }
        res.status(204).json({
            status: 'success',
            data: null
        }); */

    console.log(req.params);
    //const _sku = req.params.id * 1;
    const _sku = req.params.sku;

    Rim.deleteOne({ sku: _sku }).then(rims => {
        res.status(200).json({
            message: "Rim deleted successfully!",
        });
    });
}


const router = express.Router();

router
    .route('/')
    .get(getAllRims)
    .post(createRim);

router
    .route('/:sku')
    .get(getRim)
    .patch(updateRim)
    .delete(deleteRim);

module.exports = router;

