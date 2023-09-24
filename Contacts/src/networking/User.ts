import axios from 'axios';
import {NetworkService} from './NetworkService';

export class User extends NetworkService {
  static _instance: User = new User();

  private refreshToken: string = null;
  expirationTimestamp: number = null;

  private setExpirationTimestamp(durationSec: number) {
    this.expirationTimestamp = Date.now() + durationSec * 1000;
  }

  async login(_: string, __: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const credentials = {
        username: 'test',
        password: 'test',
      };

      // Create a base64-encoded authentication string
      const authString = Buffer.from(
        `${credentials.username}:${credentials.password}`,
      ).toString('base64');

      this.axiosService
        .post(
          '/user/login',
          {},
          {
            headers: {
              Authorization: `Basic ${authString}`,
            },
          },
        )
        .then(response => {
          this.refreshToken = response.data.refresh_token;
          this.setExpirationTimestamp(response.data.access_token_duration);
          NetworkService.instance.setAccessToken(response.data.access_token);

          resolve();
        })
        .catch(reason => reject(reason));
    });
  }

  async updateRefreshToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      const refreshTokenAxios = axios.create({
        baseURL: this.baseURL,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': this.refreshToken,
        },
      });

      refreshTokenAxios
        .post('/user/refresh')
        .then(response => {
          // TODO: send new refresh token, and expiration time
          this.setExpirationTimestamp(3600);
          NetworkService.instance.setAccessToken(response.data.access_token);
          resolve();
        })
        .catch(reason => reject(reason));
    });
  }
}
