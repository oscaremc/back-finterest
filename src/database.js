const mongoose = require('mongoose');

mongoose.connect( 'mongodb+srv://useradmn:Natalia%230@cluster0.vahw7.mongodb.net/myPrueba?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));