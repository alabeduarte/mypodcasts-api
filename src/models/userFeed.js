import mongoose from 'mongoose';

export default mongoose.model('UserFeed', mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rssUrl: String,
  title: String,
  image: mongoose.Schema.Types.Mixed
}, { versionKey: false }));
