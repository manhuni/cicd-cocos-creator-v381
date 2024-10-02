import { _decorator, Component, Node } from 'cc';
import { BaseScript } from '../base/BaseScript';
import { Logger } from '../logger/Logger';
import { AudioClipLoader } from './AudioClipLoader';
import { BitmapFontLoader } from './BitmapFontLoader';
import { FontLoader } from './FontLoader';
import { SceneLoader } from './SceneLoader';
import { SpineLoader } from './SpineLoader';
import { SpriteAtlasLoader } from './SpriteAtlasLoader';
import { SpriteFrameLoader } from './SpriteFrameLoader';
import { TextAssetLoader } from './TextAssetLoader';
import { Texture2DLoader } from './Texture2DLoader';
import { TTFLoader } from './TTFLoader';
const { ccclass, property } = _decorator;

@ccclass('ResourceLoaderManager')
export class ResourceLoaderManager extends BaseScript {
    private static instance: ResourceLoaderManager;
    private audioClipLoader: AudioClipLoader;
    private bitmapFontLoader: BitmapFontLoader;
    private fontLoader: FontLoader;
    private sceneLoader: SceneLoader;
    private spineLoader: SpineLoader;
    private spriteAtlasLoader: SpriteAtlasLoader;
    private spriteFrameLoader: SpriteFrameLoader;
    private textAssetLoader: TextAssetLoader;
    private texture2DLoader: Texture2DLoader;
    private ttfLoader: TTFLoader;
    private 
     static get I() {
        if (!this.instance) {
            this.instance = new ResourceLoaderManager();
        }
        return this.instance;
    }
    constructor(...args) {
        super(...args);
        Logger.log(this.constructor.name, "Initialized component.");
        this.audioClipLoader = new AudioClipLoader();
        this.bitmapFontLoader = new BitmapFontLoader();
        this.fontLoader = new FontLoader();
        this.sceneLoader = new SceneLoader();
        this.spineLoader = new SpineLoader();
        this.spriteAtlasLoader = new SpriteAtlasLoader();
        this.spriteFrameLoader = new SpriteFrameLoader();
        this.textAssetLoader = new TextAssetLoader();
        this.texture2DLoader = new Texture2DLoader();
        this.ttfLoader = new TTFLoader();
    }
    test(){

    }
}


