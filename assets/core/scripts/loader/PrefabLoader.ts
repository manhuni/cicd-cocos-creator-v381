import { _decorator, Component, Node } from 'cc';
import { BaseScript } from '../base/BaseScript';
import { Logger } from '../logger/Logger';
import { LoaderBase } from './LoaderBase';
const { ccclass, property } = _decorator;

@ccclass('PrefabLoader')
export class PrefabLoader extends LoaderBase {
    constructor(...args) {
        super(...args);
        Logger.log("this.constructor.name", "Initialized component.");
    }
}


