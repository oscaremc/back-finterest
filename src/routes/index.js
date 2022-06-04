const { Router } = require('express');
const router = Router();
const { unlink } = require('fs-extra');
const path = require('path');

const Image = require('../models/image')

router.get('/', async (req, res) => {
    const images = await Image.find();
    res.json({ images });
})

router.get('/upload', (req, res) => {
    res.send('Actualizacion');
})

router.post('/upload', async (req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename; 
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype; 
    image.size = req.file.size; 

    await image.save();

    res.send('Cargado con Exito!')
})

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.json({ image });
})

router.get('/image/:id/delete', async (req, res) => {
    try {
        const {id}  = req.params;
        console.log(id);
        const image = await Image.findByIdAndDelete(id);
        console.log(image);
        //const result = await cloudinary.v2.uploader.destroy(photo.public_id);
        await unlink(path.resolve('./src/public' + image.path));
        res.send('Eliminado');
    } catch (error) {
        console.log(error);
    }
});


router.put('/image/:id/update', async (req, res) => {
    try {
        const {id}  = req.params;
        console.log(id);
        const image = await Image.findOneAndUpdate(id, req.body, {new: true});
        console.log(image);
        res.json(image);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;