// ApiManager.ts
import { _decorator, Component, Event, sys } from 'cc';
import { HttpManager } from '../networking/HttpManager';
import { ApiConfig } from './ApiConfig';
import { Logger } from '../logger/Logger';
import { BaseScript } from '../base/BaseScript';
import EncryptParam from '../networking/EncryptParam';
const { ccclass } = _decorator;

@ccclass('TokenManager')
export class TokenManager extends BaseScript {
    private token_key: string = "jwt-token";
    private static instance: TokenManager;
    // Singleton instance getter
    static get I() {
        if (!this.instance) {
            this.instance = new TokenManager();
        }
        return this.instance;
    }
    getToken() {
        return EncryptParam.decrypt(sys.localStorage.getItem(this.token_key));
    }
    setToken(token) {
        sys.localStorage.setItem(this.token_key, EncryptParam.encrypt(token));
    }
}
