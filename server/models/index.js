const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/vote');
const DB = 'mongodb+srv://onkar:#@8SYG7fvXicB-m@cluster0.8q6ed.mongodb.net/voting?retryWrites=true&w=majority'
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
  console.log('connection successful');
  
}).catch((err)=> console.log('no connection'));


module.exports.User = require('./user');
module.exports.Poll = require('./poll');
