import mongoose from 'mongoose';

const User = process.env.MongoUser;
const Password = process.env.MongoPassword;
const Cluster = process.env.MongoCluster;
const DB = process.env.MongoDB;

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const URI = `mongodb+srv://${User}:${Password}@${Cluster}/${DB}?retryWrites=true`;

mongoose.connect(URI)
  .then(() => console.log('Mongo Cloud Status: \x1b[32m%s\x1b[0m', 'OK'))
  .catch(err => console.error(err));

module.exports = mongoose;