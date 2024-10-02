import { _decorator, Component, Node } from 'cc';
import { BaseScript } from '../base/BaseScript';
const { ccclass, property } = _decorator;

@ccclass('LoaderBase')
export class LoaderBase extends BaseScript {
    private _bundle: string;
    get bundle() {
        return this._bundle;
    }
    set bundle(v) {
        this._bundle = v;
    }
    private _path: string;
    get path() {
        return this._path;
    }
    set path(v) {
        this._path = v;
    }
    private _resType: string;
    get resType() {
        let type = this._resType;
        if (!type.includes("cc.")) {
            if (type.includes("SkeletonData")) {
                if (!type.includes("sp.")) {
                    type = "sp." + type;
                }
            } else {
                type = "cc." + type;
            }
        }
        return type;
    }
    set resType(v) {
        this._resType = v;
    }
    private _callback: Function;
    get callback() {
        return this._callback;
    }
    set callback(v) {
        this._callback = v;
    }
    private _nullCallback: Function;
    get nullCallback() {
        return this._nullCallback;
    }
    set nullCallback(v) {
        this._nullCallback = v;
    }
    private _addData: any;
    get addData() {
        return this._addData;
    }
    set addData(v) {
        this._addData = v;
    }
    constructor(...args) {
        super(...args);
    }
}