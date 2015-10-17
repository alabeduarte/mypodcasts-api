import UserFeed from '../../../models/userFeed';
import User from '../../../models/user';

export default class UserFeedsRepository {
  static fetchBy(username) {
    return User.findOne({ username: username })
      .then((user) => {
        return UserFeed.find({ userId: user.id }).lean().exec();
      });
  }
}
