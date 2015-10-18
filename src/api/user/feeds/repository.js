import UserFeed from '../../../models/userFeed';
import User from '../../../models/user';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export default class UserFeedsRepository {

  static fetchBy (username) {
    return User.findOne({ username: username })
      .then( (user) => {
        if (user === null) { return []; }

        return UserFeed.find({ userId: user.id }).lean().exec();
      });
  }

  static getEpisodes (feedId) {
    return UserFeed.findOne({ _id: new ObjectId(feedId) });
  }
}
