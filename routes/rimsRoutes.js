const express = require('express');

//const rims = JSON.parse();

const getAllRims = (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        requestedAt:req.requestTime,
        results:rims.length,
        data:{
            rims
        }
    });
}

const getRim = (req,res)=>{
    console.log(req.params);
    const id = req.params.id *1;
    const rims = rims.find(el=>el.id ===id);
    if(!rims){
        return res.status(404).json({
            status: 'fail',
            message:'Invalid Id'
        })
    }
    
    res.status(200).json({
        status:'success',
        data:{
            rim
        }
    });
}

const createRim = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    });
}

const updateRims = (req,res)=>{
    if(req.params.id * 1 > rims.length){
        return res.status(404).json({
            status:'fail',
            message:'invalid id'
        })
    }
    res.status(200).json({
        status:'success',
        data:'<Updated rim here...>'
    });
}



const deleteRim = (req,res)=>{
    if(req.params.id * 1 > rims.length){
        return res.status(404).json({
            status:'fail',
            message:'invalid id'
        })
    }
    res.status(204).json({
        status:'success',
        data:null
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

