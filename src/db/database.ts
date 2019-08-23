import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

const URI = 'mongodb+srv://Snakone:pocketvilla@cluster0-ov8vp.mongodb.net/Antic\'s?retryWrites=true';

mongoose.connect(URI)
  .then(db => console.log('Mongo Cloud Status: \x1b[32m%s\x1b[0m', 'OK'))
  .catch(err => console.error(err));

module.exports = mongoose;