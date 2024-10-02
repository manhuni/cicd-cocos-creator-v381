import { _decorator, Component, Node } from 'cc';
import { Logger } from '../logger/Logger';
import 'url-search-params-polyfill';
import EncryptParam from './EncryptParam';
const { ccclass } = _decorator;

@ccclass('HttpManager')
export class HttpManager {
    private static instance: HttpManager;
    private static isEncrypt: boolean = true;
    private static TOKEN_KEY = 'token'; // You can set the default token here

    static get I() {
        if (!this.instance) {
            this.instance = new HttpManager();
        }
        return this.instance;
    }

    // Method for making GET requests
    public get(url: string, params: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            try {

                let retUrl = url;

                // Handle encryption of the params if `params.isEncrypt` is true
                if (HttpManager.isEncrypt) {
                    retUrl += '?game_data=' + EncryptParam.encrypt(this.createQueryString(params, [HttpManager.TOKEN_KEY]));
                } else {
                    retUrl += '?' + this.createQueryString(params);
                }
                Logger.log("this.constructor.name", 'get retUrl', retUrl);
                // Create a new XMLHttpRequest for GET
                const xhr = new XMLHttpRequest();
                xhr.open("GET", retUrl, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = () => {
                    Logger.log("this.constructor.name", 'get xhr.readyState', xhr.readyState);
                    Logger.log("this.constructor.name", 'get xhr.status', xhr.status);
                    Logger.log("this.constructor.name", 'get xhr.responseText', xhr.responseText);  
                    if (xhr.readyState === 4) { 
                        if (xhr.status >= 200 && xhr.status <= 207) {
                            let response = this.createResponseText(xhr.responseText);
                            Logger.log("this.constructor.name", 'response success', response);
                            resolve(response);
                        } else {
                            reject(`GET request failed: ${xhr.status} ${xhr.statusText}`);
                        }
                    }
                };
                // Send the request
                xhr.send();
            } catch (error) {
                Logger.error("this.constructor.name", 'get', error);
                reject(error);
            }
        });
    }

    // Method for making POST requests
    public post(url: string, body: Record<string, any>, params: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                let retUrl = url;
                // Handle encryption of the params if `params.isEncrypt` is true
                if (HttpManager.isEncrypt) {
                    retUrl += '?game_data=' + EncryptParam.encrypt(this.createQueryString(params, [HttpManager.TOKEN_KEY]));
                } else {
                    retUrl += '?' + this.createQueryString(params);
                }
                Logger.log("this.constructor.name", 'post retUrl', retUrl);
                // Create a new XMLHttpRequest for POST
                const xhr = new XMLHttpRequest();
                xhr.open("POST", retUrl, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = () => {
                    Logger.log("this.constructor.name", 'post xhr.readyState', xhr.readyState);
                    Logger.log("this.constructor.name", 'post xhr.status', xhr.status);
                    Logger.log("this.constructor.name", 'post xhr.responseText', xhr.responseText); 
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status <= 207) {
                            let response = this.createResponseText(xhr.responseText);
                            Logger.log("this.constructor.name", 'response success', response);
                            resolve(response);
                        } else {
                            reject(`POST request failed: ${xhr.status} ${xhr.statusText}`);
                        }
                    }
                };

                // Send the JSON-encoded body
                xhr.send(JSON.stringify(body));
            } catch (error) {
                Logger.error("this.constructor.name", 'post', error);
                reject(error);
            }
        });
    }

    // Utility method to create query strings
    private createQueryString(params: any, excludeKeys: string[] = []): string {
        const queryParams = new URLSearchParams();
        // Add all parameters except for those in the excludeKeys array
        for (const key in params) {
            if (params.hasOwnProperty(key) && !excludeKeys.includes(key)) {
                queryParams.append(key, params[key]);
            }
        }
        return queryParams.toString();
    }
    private createResponseText(responseText: string): string {
        let retResponseTxt = responseText;
        if (HttpManager.isEncrypt) {
            retResponseTxt = EncryptParam.decrypt(responseText);
        }
        return retResponseTxt;
    }
}
