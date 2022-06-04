const { Router } = require('express');
const router = Router();

const Image = require('../models/image')

router.get('/', (req, res) => {
    
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

router.get('/image/:id', (req, res) => {
    res.send('Perfil Imagen')
})

router.get('/image/:id/delete', (req, res) => {
    res.send('Imagen Eliminada')
})

module.exports = router;