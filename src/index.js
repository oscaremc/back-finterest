const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { dirname } = require('path');
const uuid =  require('uuid/v4');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

// inicializacion 
const app = express();
require('./database')

// opciones 
app.set('port', process.env.PORT || 3000);

// Middlewares 
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname))
    }
})
app.use(multer({storage: storage}).single('image'));

// variables globales 

// rutas 
app.use(require('./routes/index.js'));

// archivos estaticos 

// inicio del server 

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server on port ${app.get('port')}`);
});