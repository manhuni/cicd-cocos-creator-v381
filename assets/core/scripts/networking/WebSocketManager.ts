import { _decorator, Component, Node } from 'cc';
import { BaseScript } from '../base/BaseScript';
import { MyWebSocket } from './MyWebSocket';
import { Logger } from '../logger/Logger';
const { ccclass, property } = _decorator;

@ccclass('WebSocketManager')
export class WebSocketManager extends BaseScript {
    private static instance: WebSocketManager;
    static get I() {
        if (!this.instance) {
            this.instance = new WebSocketManager();
        }
        return this.instance;
    }
    private connections: { [key: string]: MyWebSocket } = {};

    public connect(channel: string, url: string) {
        if (this.connections[channel]) {
            console.warn(`Already connected to ${channel}`);
            return;
        }
        const socket = new MyWebSocket(url);

        socket.onopen = () => {
            Logger.log("this.constructor.name",`${channel} WebSocket connection opened`);
        };

        socket.onmessage = (event) => {
            Logger.log("this.constructor.name",`${channel} message received:`, event.data);
        };

        socket.onclose = () => {
            Logger.log("this.constructor.name",`${channel} WebSocket connection closed`);
            delete this.connections[channel];
        };

        this.connections[channel] = socket;
    }

    public send(channel: string, message: any) {
        const socket = this.connections[channel];
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        } else {
            console.warn(`No active connection for ${channel}`);
        }
    }

    public close(channel: string) {
        const socket = this.connections[channel];
        if (socket) {
            socket.close();
        }
    }
}


