import { _decorator, Component, Label, Node } from 'cc';
import { ApiManager } from '../core/scripts/api/ApiManager';
import { ApiConfig } from '../core/scripts/api/ApiConfig';
import { LoginManager } from '../core/scripts/api/LoginManager';
import { TokenManager } from '../core/scripts/api/TokenManager';
import { Logger } from '../core/scripts/logger/Logger';
const { ccclass, property } = _decorator;

@ccclass('TestButton')
export class TestButton extends Component {
    @property(Label)
    tokenLbl: Label = null;
    protected onLoad(): void {
        this.tokenLbl.string = "";
    }
    start() {

    }

    update(deltaTime: number) {

    }
    onClick() {
        this.tokenLbl.string = "";
        ApiManager.I.getConfig().then((data) => {
            Logger.log("this.constructor.name", "onClick", JSON.stringify(data));
            let params = {
                "username": "manhna3",
                "password": "123123",
                "deviceid": ApiConfig.deviceId,
                "firebase_token": ApiConfig.fcmToken
            }
            LoginManager.I.login(params.username, params.password, params.deviceid, params.firebase_token).then((data) => {
                TokenManager.I.setToken("");
                if (!data) return;
                let token = data.token;
                // Check if the token is empty
                if (!token || token.trim() === '') {
                    Logger.error("this.constructor.name", 'Token is empty.');
                    return false;
                }
                TokenManager.I.setToken(token);
                this.tokenLbl.string = TokenManager.I.getToken();
            }).catch((error) => {
                Logger.error("this.constructor.name", error);
            });
        }).catch((err) => {
            Logger.error("this.constructor.name", err);
        })
    }
}


