import UserFeed from '../../../models/userFeed';

export default class UserFeedsRepository {
  static fetchBy() {
    return UserFeed.find({}).stream();
  }
}
