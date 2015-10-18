import config from 'config';
import mongoose from 'mongoose';

class Database {
  constructor () {
    this.environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
    this.hosts = process.env.MONGODB_HOSTS;
    this.name = config.get('database.name');
    this.uri = `mongodb://${this.hosts}/${this.name}`;
  }

  connect (callback) {
    console.log(`[INFO] Connecting to database: { environment: ${this.environment}, name: ${this.name} }`);

    return mongoose.connect(this.uri, callback);
  }

  isAlreadyConnected () {
    return mongoose.connection.db;
  }
}

export default new Database();
