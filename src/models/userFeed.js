import mongoose from 'mongoose';

const dbURI = `mongodb://${process.env.MONGODB_HOSTS}/mypodcasts-api-test`;
mongoose.connect(dbURI);

export default mongoose.model('UserFeed', mongoose.Schema({
  title: String,
  image: mongoose.Schema.Types.Mixed
}, { versionKey: false }));
