// RegisterManager.ts
import { BaseScript } from '../base/BaseScript';
import { HttpManager } from '../networking/HttpManager';
import { ApiConfig } from './ApiConfig';

export class RegisterManager extends BaseScript {
    private static instance: RegisterManager;
    static get I() {
        if (!this.instance) {
            this.instance = new RegisterManager();
        }
        return this.instance;
    }
    async register(...args): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let params = {
                    "username": args[0],
                    "password": args[1],
                    "agency_code": args[2],
                    "source": args[3],
                    "telegram_play": args[4],
                    "deviceid": args[5],
                    "firebase_token": args[6],
                };
                HttpManager.I.post(ApiConfig.REGISTER_API, params).then((response) => {
                    resolve(JSON.parse(response));
                }).catch((error) => {
                    reject(error);
                });
            } catch (error) {
                reject(error);
            }
        })
    }
}
