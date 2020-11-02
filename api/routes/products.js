const express = require('express');
const router = express.Router();


router.get('/',(req, res, next) => {
    res.status(200).json({
        message:'its worksing prodect get'
    });
});

router.post ('/',(req, res, next) => {
    const prodect ={
        name:req.body.name,
        price:req.body.price
    };
    res.status(201).json({
        message:'its worksing prodect post',
        Created:prodect
    });
});


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if (id ==='special') {
        res.status(200).json({
            message:'You discoverd the special item',
            id : id
        })
    }
    else {
        res.status(200).json({
            message:'You Pass an id'
        })
    }
})

router.patch('/',(req, res, next) => {
    res.status(200).json({
        message:'Update prodect'
    });
});


router.delete('/',(req, res, next) => {
    res.status(200).json({
        message:'Delete prodect'
    });
});




module.exports = router;