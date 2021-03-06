import UserFeed from '../../../models/userFeed';
import User from '../../../models/user';
import mongoose from 'mongoose';

import EpisodesRepository from './episodes/repository';

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
    return UserFeed.findOne({ _id: new ObjectId(feedId) }).then( (userFeed) => {
      return EpisodesRepository.getEpisodes(userFeed).then( (episodes) => {
        return {
          id: userFeed.id,
          title: userFeed.title,
          image: userFeed.image,
          episodes: episodes.map( (episode) => {
            return Object.assign(episode, {
              podcast: {
                id: userFeed.id,
                title: userFeed.title,
                image: userFeed.image
              }
            });
          })
        };

      });
    });
  }
}
