import { _decorator, Component, Node } from 'cc'; 
import { Logger } from '../logger/Logger';
import { LoaderBase } from './LoaderBase';
const { ccclass, property } = _decorator;

@ccclass('BitmapFontLoader')
export class BitmapFontLoader extends LoaderBase {
    constructor(...args) {
        super(); 
        Logger.log("this.constructor.name", "Initialized component.");
    }
}



