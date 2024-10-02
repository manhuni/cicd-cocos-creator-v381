// ApiManager.ts
import { _decorator, Component, Event } from 'cc';
import { HttpManager } from '../networking/HttpManager';
import { Logger } from '../logger/Logger';
import { BaseScript } from '../base/BaseScript';
import { BridgeManager } from '../native/BridgeManager';

const { ccclass } = _decorator;

@ccclass('ApiConfig')
export class ApiConfig extends BaseScript {
    static baseUrl: string = 'https://portal.pokerdev.xyz'; // Base URL for your API
    static gameConfigEndpoint: string = '/game-config'; // Specific endpoint for game config
    static isActiveEventCharge: boolean = false;
    static eventLobbyIndex: number = 0;
    static telegramBot: string = '';
    static telegramChannel: string = '';
    static telegramVerify: string = '';
    static telegramSupport: string = '';
    static fbSupport: string = '';
    static fbFanpage: string = '';
    static landingPage: string = '';
    static zaloSupport: string = '';
    static phoneSupport: string = '';
    static liveChatSupport: boolean = false;
    static maxBet: number = 0;
    static minMoneyChat: number = 0;
    static env: boolean = true; // Set environment variable here
    static gameId: number = -1;
    static userId: string = '';
    static isSsl: boolean = false;
    static serverHost: string = '';
    static serverPort: number = 0;
    static chatHost: string = '';
    static chatPort: number = 0;
    static bundlesUrl: string = '';
    static hotupdateUrl: string = '';
    static baseUrlMiniGame: string = '';

    // Define API endpoints
    static LOGIN_API: string = '';
    static LOGIN_FB_API: string = '';
    static REGISTER_API: string = '';
    static SET_DISPLAY_NAME: string = '';
    static CHANGE_PASSWORD: string = '';
    static USER_FULL_INFO: string = '';
    static JACKPOT_HISTORY_API: string = '';
    static BET_HISTORY_API: string = '';
    static WEB_API_BASE_URL: string = '';
    static MINI_POKER_HISTORY_API: string;
    static MINISLOT_3X3EX_HISTORY_API: string;
    static USER_HISTORY: string;
    static USER_HISTORY_PAY: string;
    static USER_HISTORY_CASHOUT: string;
    static RECEIVE_GIFTCODE: string;
    static RANK_API: string;
    static USER_HOP_THU: string;
    static USER_HOP_THU_XOA: string;
    static USER_HOP_THU_EVENT: string;
    static USER_CHI_TIET_THU: string;
    static API8: string;
    static API8_V2: string;
    static MM_INF: string;
    static BK_INF: string;
    static API2: string;
    static API2_V2: string;
    static MM_WD: string;
    static fcmToken: string;
    static deviceId: string;
    // ... (add other endpoints as needed)

    static loadConfig(cfg: any) {
        let schema = cfg.isSsl ? 'https://' : 'http://';
        this.isActiveEventCharge = cfg.isActiveEventCharge;
        this.eventLobbyIndex = cfg.eventLobbyIndex;
        this.telegramBot = cfg.telegram_phone;
        this.telegramChannel = cfg.telegram_chanel;
        this.telegramVerify = cfg.telegram_verify;
        this.telegramSupport = cfg.telegram_support;
        this.fbSupport = cfg.fb_support;
        this.fbFanpage = cfg.fb_fanpage;
        this.landingPage = cfg.landing_page;
        this.zaloSupport = cfg.zalo_support;
        this.phoneSupport = cfg.phone_support;
        this.liveChatSupport = cfg.live_chat_support;
        this.maxBet = cfg.max_bet;
        this.minMoneyChat = cfg.min_money_chat;
        this.env = true; // Set environment variable here
        this.gameId = -1;
        this.userId = '';
        this.isSsl = cfg.isSsl;
        this.serverHost = cfg.serverHost;
        this.serverPort = cfg.serverPort;
        this.chatHost = cfg.chatHost;
        this.chatPort = cfg.chatPort;
        this.baseUrl = cfg.baseUrl;
        this.bundlesUrl = cfg.bundlesUrl;
        this.hotupdateUrl = cfg.hotupdateUrl;
        this.baseUrlMiniGame = cfg.baseUrlMiniGame;

        // Define endpoints
        this.LOGIN_API = schema + this.baseUrl + "/users/login";
        this.LOGIN_FB_API = schema + this.baseUrl + "/users/login/fb";
        this.REGISTER_API = schema + this.baseUrl + "/users/register";
        this.SET_DISPLAY_NAME = schema + this.baseUrl + "/users/update-displayname";
        this.CHANGE_PASSWORD = schema + this.baseUrl + "/users/change-password";
        this.USER_FULL_INFO = schema + this.baseUrl + "/users/full-info";
        this.JACKPOT_HISTORY_API = schema + this.baseUrl + "/game-honor";
        this.BET_HISTORY_API = schema + this.baseUrlMiniGame + "/9901/history-summary";
        this.BET_HISTORY_API = schema + this.baseUrlMiniGame + "/9901/history-detail";
        this.WEB_API_BASE_URL = schema + this.baseUrlMiniGame;

        // Additional endpoints (as defined in your original code)
        this.MINI_POKER_HISTORY_API = this.WEB_API_BASE_URL + "/mini-poker/history";
        this.MINISLOT_3X3EX_HISTORY_API = this.WEB_API_BASE_URL + "/slot33-ex/history";
        this.USER_HISTORY = this.WEB_API_BASE_URL + "/history/all-game";
        this.USER_HISTORY_PAY = this.WEB_API_BASE_URL + "/history/charge";
        this.USER_HISTORY_CASHOUT = this.WEB_API_BASE_URL + "/history/withdraw";
        this.RECEIVE_GIFTCODE = schema + this.baseUrl + "/gift-code";
        this.RANK_API = schema + this.baseUrl + "/game-rank";

        // Mail and charge endpoints
        this.USER_HOP_THU = schema + this.baseUrl + "/mail/info-all";
        this.USER_HOP_THU_XOA = schema + this.baseUrl + "/mail/delete";
        this.USER_HOP_THU_EVENT = schema + this.baseUrl + "/mail/events";
        this.USER_CHI_TIET_THU = schema + this.baseUrl + "/mail/detail";

        // Momo and Bank info endpoints
        this.API8 = schema + this.baseUrl + "/charge/card"; // nap the
        this.API8_V2 = schema + this.baseUrl + "/charge/card1"; // nap the
        this.MM_INF = schema + this.baseUrl + "/charge/momo";
        this.BK_INF = schema + this.baseUrl + "/charge/bank";

        // Withdraw endpoints
        this.API2 = schema + this.baseUrl + "/withdraw/card";
        this.API2_V2 = schema + this.baseUrl + "/withdraw/card1";
        this.MM_WD = schema + this.baseUrl + "/withdraw/momo";

        // Other charge and withdrawal endpoints...
        this.fcmToken = BridgeManager.I.GetFirebaseToken() || "1"; // Default to "1" if null
        this.deviceId = BridgeManager.I.GetDeviceId() || "1"; // Default to "1" if null
    }
}
