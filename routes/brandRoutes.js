const express = require('express');
const Brand = require('../models/brand.js');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const { default: mongoose } = require('mongoose');

const jwtkey = process.env.JWT_KEY;

const multerStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/img/brands');
    },
    filename:(req,file,cb)=>{
        
        const fileextension = file.mimetype.split('/')[1];
        cb(null,`brand-${req.body.brand}-${Date.now()}.${fileextension}`);

    }
});

//filter so you upload only images
const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb("not an image",false);
    }
};

//middleware for jwt authentication

const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        jwt.verify(token, jwtkey, (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Token inválida' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send(401, 'Token no provista');
        /*   res.send({
              mensaje: 'Token no provista.'
          }); */
    }
});

///


//setup file upload
/* const upload = multer({ dest: 'public/img/logos' }) */
const upload = multer({ 
    storage:multerStorage,
    fileFilter:multerFilter
});



const getAllBrands = (req, res) => {
    console.log(req.requestTime);
    Brand.find().then(brands => {
        res.status(200).json({
            message: "Brands fetched successfully!",
            results: brands
        });
    });
}

const getBrand = (req, res) => {
    console.log(req.params);
    //const _sku = req.params.id * 1;
    let _brand = req.params.id;
    _brand = _brand.toUpperCase();

    Brand.find({ brand: _brand }).then(brands => {
        res.status(200).json({
            message: "Brands fetched successfully!",
            brands: brands
        });
    });


}

const createBrand = (req, res) => {

    let data = req.body;

    const brand = new Brand({
        brand: data.brand.toUpperCase(),
        brandlogo: req.file !== undefined? req.file.filename:""
    });

    brand.save().then(createdBrand => {

        console.log(createdBrand._id);
        if (createBrand) {
            res.status(201).json({
                message: "Brand added successfully",
                postId: createBrand._id
            });

        } else {
            res.status(500).json({
                message: "Error saving brand"
            });
        }

    })
}

const updateBrand = (req, res) => {

    let data = req.body;

    return Brand.updateOne(
        { _id: req.params.id },
        {
            $set: {
                brand: data.brand,
                brandlogo: data.brandlogo
            }

        }
    ).then(result => {
        res.status(200).json({ message: "Brand updated successfully!" });
    })
}

const updateBrandWithLogo = (req, res) => {
    console.log(req.file);
    console.log(req.body);

    let data = req.body;

    return Brand.updateOne(
        { _id: req.params.id },
        {
            $set: {
                brand: data.sku,
                brandlogo: req.file.filename
            }

        }
    ).then(result => {
        res.status(200).json({ message: "Brand updated successfully!" });
    })
}


const deleteBrand = (req, res) => {


    console.log(req.params);
    //const _sku = req.params.id * 1;
    const id = mongoose.Types.ObjectId(req.params.id);
    

    Brand.findByIdAndRemove(id).then(brands => {
        res.status(200).json({
            message: "Brand deleted successfully!",
        });
    });
}


const router = express.Router();

router
    .route('/')
    .get(getAllBrands)
    .post(upload.single('brandlogo'),createBrand);

router
    .route('/:id')
    .get(getBrand)
    .patch(updateBrand)
    .delete(deleteBrand);

router.put('/updateBrandWithLogo', upload.single('brandlogo'), updateBrandWithLogo);

module.exports = router;

