import { User } from '../model/user.model.js';

export class UserAuthRepository {
  constructor() {
    this._model = User;
  }

  async getUserData(userId) {
    const user = this._model
      .findOne({ _id: userId })
      .select('userName email profilePicture followers following');

    return user;
  }

  async registerUser(params) {
    const { password, name, email, profilePicture } = params;

    const user = await this._model.create({
      password,
      name,
      email,
      profilePicture,
    });
    console.log('2', user);
    return user;
  }

  async isUserAlreadyExists(email) {
    const user = await this._model.findOne({ email });
    if (!user) {
      return false;
    }

    return user;
  }
}
