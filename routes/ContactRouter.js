const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

function onResult(succ, msg, details) {
    return {
        code: succ,
        message: msg,
        data: details,
    };
}

router.get('/', async (req,res,next)=>{
    try{
        const result = await Contact.find();
        res.json(onResult(200,'Succes retrieving data',result))
    } catch(error){
        next(error);
    }
    });

router.post('/', async (req,res,next)=>{
    try{
        const contact = new Contact(req.body);
        const result = await contact.save();
        res.send(result);
    } catch (error) {
        throw error;
    }
})

router.put('/:id', async (req,res,next)=> {
    try{
        const id = req.params.id;
        const updates = req.body;
        const options = {new: true};
        const result = await Contact.findByIdAndUpdate(id,updates,options);
        res.json(onResult('204','Resource update succesfully!',result))
    } catch(error){
        console.log(error);
    }
})

router.delete('/:id', async (req,res,next)=>{
    const id = req.params.id;
    try{
        const result = await Contact.findByIdAndDelete(id);
        res.json(onResult(200,'Delete Success',result));
    } catch(error){
        next(error);
    }
})

router.use((req,res,next)=> {
    const error = new Error('Page not found!');
    error.status = 404;
    next(error);
})

router.use((err,req,res,next)=> {
    res.status(err.status || 500);
    res.send({
        error: err.status || 500,
        message: err.message
    })
})
module.exports = router;