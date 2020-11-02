const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
       message: 'Oerder is prsseisg' 
    })
})

router.post('/', (req, res, next) => {
    const oder ={
            protectId: req.body.protectId,
            quality : req.body.quality
    }
    res.status(201).json({
       message: 'Oerder Created',
       oder : oder
    })
})

router.post('/:orderId', (req, res, next) => {
    res.status(201).json({
       message: 'Oerder Detals' ,
       orderId: req.params.orderId
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(201).json({
       message: 'Oerder Deleted' ,
       orderId: req.params.orderId
    })
})


module.exports = router;