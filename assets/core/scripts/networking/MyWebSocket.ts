import { _decorator, Component, Node } from 'cc';
import { Logger } from '../logger/Logger';
const { ccclass, property } = _decorator;

@ccclass('MyWebSocket')
export class MyWebSocket extends WebSocket {
    constructor(url: string) {
        super(url);
        // Bind event listeners
        this.onopen = this.handleOpen.bind(this);
        this.onmessage = this.handleMessage.bind(this);
        this.onerror = this.handleError.bind(this);
        this.onclose = this.handleClose.bind(this);
    }

    private handleOpen(event: Event) {
        Logger.log("this.constructor.name", "Connected to the server.", event);
    }

    private handleMessage(event: MessageEvent) {
        Logger.log("this.constructor.name", "Received message: ${event.data}");
    }

    private handleError(event: Event) {
        Logger.log("this.constructor.name", "WebSocket error:", event);
    }

    private handleClose(event: CloseEvent) {
        Logger.log("this.constructor.name", "Disconnected from the server.", event);
        // Optionally implement reconnection logic here
    }

    // Additional method to send JSON data
    public sendJson(data: object) {
        this.send(JSON.stringify(data));
        Logger.log("this.constructor.name", "Sent JSON:", data);
    }
}
