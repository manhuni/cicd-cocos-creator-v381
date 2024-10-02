// ApiManager.ts
import { _decorator, Component, Event } from 'cc';
import { HttpManager } from '../networking/HttpManager';
import { ApiConfig } from './ApiConfig';
import { Logger } from '../logger/Logger';
import { BaseScript } from '../base/BaseScript';
const { ccclass } = _decorator;

@ccclass('ApiManager')
export class ApiManager extends BaseScript {
    private static instance: ApiManager;
    // Common configurations
    private game_config: any = null;
    // Singleton instance getter
    static get I() {
        if (!this.instance) {
            this.instance = new ApiManager();
        }
        return this.instance;
    }
    getConfig(...args): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                Logger.log("this.constructor.name", `getConfig`);
                if (this.game_config) {
                    resolve(this.game_config);
                } else {
                    const apiUrl = `${ApiConfig.baseUrl}${ApiConfig.gameConfigEndpoint}`;
                    const params = {
                        'env': 'live',
                    };
                    HttpManager.I.get(apiUrl, params)
                        .then((data) => {
                            // You can now use the fetched data for your game;
                            this.game_config = JSON.parse(data);
                            ApiConfig.loadConfig(JSON.parse(data));
                            Logger.log("this.constructor.name", `data`, data);
                            resolve(JSON.parse(data));
                        })
                        .catch((error) => {
                            Logger.error("this.constructor.name", `data error`, error);
                            reject(error);
                        });
                }
            } catch (error) {
                Logger.error("this.constructor.name", `getConfig`, error);
                reject(error);
            }
        })
    }

}
