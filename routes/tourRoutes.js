const express = require('express');

//const tours = JSON.parse();

const getAllTours = (req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        status:'success',
        requestedAt:req.requestTime,
        results:tours.length,
        data:{
            tours
        }
    });
}

const getTour = (req,res)=>{
    console.log(req.params);
    const id = req.params.id *1;
    const tour = tours.find(el=>el.id ===id);
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message:'Invalid Id'
        })
    }
    
    res.status(200).json({
        status:'success',
        data:{
            tour
        }
    });
}

const createTour = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    });
}

const updateTour = (req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status:'fail',
            message:'invalid id'
        })
    }
    res.status(200).json({
        status:'success',
        data:'<Updated tour here...>'
    });
}



const deleteTour = (req,res)=>{
    if(req.params.id * 1 > tours.length){
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
    .get(getAllTours)
    .post(createTour);

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;

