import { _decorator, Component, Node } from 'cc';
import { IBaseScriptInterface } from './BaseScriptInterface';
const { ccclass, property } = _decorator;

@ccclass('BaseScript')
export class BaseScript implements IBaseScriptInterface { 
    constructor(...args){  
    }
}