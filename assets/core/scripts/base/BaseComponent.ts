import { _decorator, Component, Node } from 'cc';
import { BaseComponentInterface } from './BaseComponentInterface';
const { ccclass, property } = _decorator;

@ccclass('BaseComponent')
export class BaseComponent extends Component implements BaseComponentInterface { 
}


