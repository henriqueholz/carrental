import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUsersTokenRepository } from "../IUsersTokenRepository";

export class UsersTokenRespositoryInMemory implements IUsersTokenRepository {
  usersToken: UserToken[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, { expires_date, refresh_token, user_id });
    this.usersToken.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = this.usersToken.find(
      (user) => user.user_id === userId && user.refresh_token === refresh_token
    );
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersToken.find((user) => user.id === id);
    this.usersToken.splice(this.usersToken.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.usersToken.find(
      (user) => user.refresh_token === refresh_token
    );
    return userToken;
  }
}
