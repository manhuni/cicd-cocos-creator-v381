// LoginManager.ts
import { BaseScript } from '../base/BaseScript';
import { Logger } from '../logger/Logger';
import { HttpManager } from '../networking/HttpManager';
import { ApiConfig } from './ApiConfig';

export class LoginManager extends BaseScript {
    private static instance: LoginManager;
    static get I() {
        if (!this.instance) {
            this.instance = new LoginManager();
        }
        return this.instance;
    }
    async login(...args): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let params = {
                    "username": args[0],
                    "password": args[1],
                    "deviceid": args[2],
                    "firebase_token": args[3],
                }
                HttpManager.I.post(ApiConfig.LOGIN_API, params).then((response) => {
                    Logger.log("this.constructor.name", 'login', response);
                    resolve(JSON.parse(response));
                }).catch((error) => {
                    Logger.error("this.constructor.name", 'login', error);
                    reject(error);
                });
            } catch (error) {
                Logger.error("this.constructor.name", 'login', error);
                reject(error);
            }
        })
    }
}
