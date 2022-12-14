const express = require('express');
const Rim = require('../models/rim.js');
const multer = require('multer');


const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/rims');
    },
    filename: (req, file, cb) => {

        const fileextension = file.mimetype.split('/')[1];
        cb(null, `rim-${req.body.sku}-${Date.now()}.${fileextension}`);

    }
});

//filter so you upload only images
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb("not an image", false);
    }
};



//setup file upload
/* const upload = multer({ dest: 'public/img/rims' }) */
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
//exports.uploadRimPhoto = upload.single('photo');


const getAllRims = (req, res) => {
    console.log(req.requestTime);
    Rim.find().then(rims => {
        res.status(200).json({
            message: "Rims fetched successfully!",
            results: rims
        });
    });
}

const getRimsByBrand = (req, res) => {
    console.log(req.requestTime);
    
    const _brand = req.params.brand.toUpperCase();
    Rim.find({brand:_brand}).then(rims => {
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

    Rim.exists({ serial: data.serial }, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Result :", doc) // true
            if (doc === null) {
                const rim = new Rim({
                    sku: data.sku,
                    modelname: data.modelname,
                    description: data.description,
                    partsupl: data.partsupl,
                    serial: data.serial,
                    datemfg: data.datemfg,
                    qty: data.qty,
                    brand: data.brand,
                    photo: req.file !== undefined ? req.file.filename : ""
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

            }else{
                res.status(200).json({
                    message: "Rim already exists"
                });
            }
        }
    })


}

const updateRim = (req, res) => {

    let data = req.body;

    return Rim.updateOne(
        { sku: req.params.sku },
        {
            $set: {
                sku: data.sku,
                modelname: data.modelname,
                description: data.description,
                partsupl: data.partsupl,
                serial: data.serial,
                datemfg: data.datemfg,
                qty: data.qty,
                brand: data.brand,
            }

        }
    ).then(result => {
        res.status(200).json({ message: "Rim updated successfully!" });
    })
}

const updateRimWithPhoto = (req, res) => {
    console.log(req.file);
    console.log(req.body);

    let data = req.body;

    return Rim.updateOne(
        { sku: req.params.sku },
        {
            $set: {
                sku: data.sku,
                modelname: data.modelname,
                description: data.description,
                partsupl: data.partsupl,
                serial: data.serial,
                datemfg: data.datemfg,
                qty: data.qty,
                brand: data.brand,
                photo: req.file.filename
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
        console.log("deleted");
        res.status(200).json({
            message: "Rim deleted successfully!",
        });
    });
}


const router = express.Router();

router
    .route('/')
    .get(getAllRims)
    .post(upload.single('photo'), createRim);

router
    .route('/:sku')
    .get(getRim)
    .patch(updateRim)
    .delete(deleteRim);

router.get('/getRimsByBrand/:brand',getRimsByBrand);

//'photo' is the field in the form that is uploading the image
/* router..route('/updateRimWithPhoto')
    .patch(upload.single('photo'), updateRimWithPhoto);
 */

router.put('/updateRimWithPhoto', upload.single('photo'), updateRimWithPhoto);

module.exports = router;

