import { BadRequestError } from '../../utils/response/error.js';
import { newToken } from '../../utils/token.js';
import { UserAuthRepository } from '../repository/auth.repository.js';

class UserAuthServices {
  constructor() {
    this._userAuthRepository = new UserAuthRepository();
  }
  //getting user data
  async getUserData(userId) {
    const user = await this._userAuthRepository.getUserData(userId);
    if (!user) {
      throw new BadRequestError('User not found!');
    }

    return user;
  }

  //register user
  async registerUser(params) {
    const { password, userName, email, profilePicture } = params;

    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );
    if (alreadyUser) {
      throw new BadRequestError('User already exists!');
    }
    console.log('2', alreadyUser);
    const user = await this._userAuthRepository.registerUser({
      password,
      userName,
      email,
      profilePicture,
    });
    console.log('2', user);
    if (!user) {
      throw new BadRequestError('Not able to create the user');
    }
    const token = newToken();

    return {
      token,
      user,
    };
  }

  //user login in
  async userLogin(params) {
    const { password, email } = params;
    const alreadyUser = await this._userAuthRepository.isUserAlreadyExists(
      email
    );

    if (!alreadyUser) {
      throw new BadRequestError('User does not exists with this email id');
    }
    const match = alreadyUser.checkPassword(password);
    if (!match) {
      throw new BadRequestError('Password does not match');
    }
    const token = newToken();

    return { token, user: alreadyUser };
  }
}

export const UserAuthServices_ = new UserAuthServices();
