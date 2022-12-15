const express = require('express');
const multer = require('multer');
const ptp = require('pdf-to-printer');
const fs = require('fs');
const path = require('path');


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


const getAllPrinters = (req, res) => {
    console.log(req.requestTime);
    ptp.getPrinters().then(console.log);
}

const printInDefaultPrinter = (req, res) => {
    let currentPrinters = [];
    currentPrinters = ptp.getPrinters().then(console.log);
    const options = {
        printer: currentPrinters[0].deviceId    ,
        scale: "fit",
      };

      print("assets/pdf-sample.pdf", options).then(console.log);

    console.log(req.requestTime);
}

const  printInGreenLabel = (req, res) => {

    let currentPrinters = [];
    currentPrinters = ptp.getPrinters().then(async (res)=>{
        currentPrinters = res;
        console.log(res);    
        
        let options = {
            printer: currentPrinters[1].name,
            scale: "fit",
        }
        try{
            //C:\Users\rober\Repos\RinesApi\RinesApi\routes\pdf-sample.pdf
            let pathtofile =`C:\\Users\\rober\\Repos\\RinesApi\\RinesApi\\routes\\pdf-sample.pdf`;
            console.log(pathtofile);
            await ptp.print(pathtofile, options).then(console.log);

        }catch(err){
            console.log("Error" + err);
        }
 
    })
    /*

      print("assets/pdf-sample.pdf", options).then(console.log);

    console.log(req.requestTime);*/
}


const printOrangeLabel = (req, res) => {

    let currentPrinters = [];
    currentPrinters = ptp.getPrinters().then(console.log);
    const options = {
        printer: currentPrinters[0].deviceId    ,
        scale: "fit",
      };

      print("../assets/pdf-sample.pdf", options).then(console.log);

    console.log(req.requestTime);

}


/* 
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
 */


const router = express.Router();

router
    .route('/')
    .get(getAllPrinters);

router.get('/printgreenlabel', printInGreenLabel);
router.get('/printorangelabel', printOrangeLabel);        
   // .post(upload.single('photo'), createRim);

/* router
    .route('/:sku')
    .get(getRim)
    .patch(updateRim)
    .delete(deleteRim);
 */


/* router.put('/updateRimWithPhoto', upload.single('photo'), updateRimWithPhoto);
 */
module.exports = router;

