import mongoose from 'mongoose';

export default mongoose.model('User', mongoose.Schema({
  username: String
}, { versionKey: false }));
