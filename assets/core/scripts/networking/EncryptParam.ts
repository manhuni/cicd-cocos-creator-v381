import { Logger } from "../logger/Logger";
import CryptoTS from "./CryptoJS";
export default class EncryptParam {
    // Key and IV as static readonly properties
    static get key() {
        if (!this._key) {
            this._key = CryptoTS.lib.WordArray.create([2626295849, 3392329469, 2201545790, 1114588389]);
        }
        Logger.log(this.constructor.name, this._key);
        return this._key;
    }
    static get iv() {
        if (!this._iv) {
            this._iv = CryptoTS.lib.WordArray.create([2596084769, 1722611613, 3782157548, 1238504529], 16);
        }
        Logger.log(this.constructor.name, this._iv);
        return this._iv;
    }
    private static _key;
    private static _iv;
    // private static readonly key = new CryptoTS.lib.WordArray([2626295849, 3392329469, 2201545790, 1114588389]);
    // private static readonly iv = new CryptoTS.lib.WordArray([2596084769, 1722611613, 3782157548, 1238504529], 16);

    // Encrypt the given text
    public static encrypt(text: string): string {
        Logger.log(this.constructor.name, `encrypt`, text);
        try {
            const encrypted = CryptoTS.AES.encrypt(text, this.key, { iv: this.iv });
            return encodeURIComponent(encrypted.toString());
        } catch (error) {
            Logger.error(this.constructor.name, `encrypt`, error);
            return text;
        }
    }

    // Decrypt the given data
    public static decrypt(data: string): string {
        Logger.log(this.constructor.name, `decrypt`, data);
        try {
            const decrypted = CryptoTS.AES.decrypt(decodeURIComponent(data), this.key, { iv: this.iv });
            return decrypted.toString(CryptoTS.enc.Utf8);
        } catch (error) {
            Logger.error(this.constructor.name, `decrypt`, error);
            return data;
        }
    }
}

// Make EncryptParam accessible in the global window object
(window as any)['EncryptParam'] = EncryptParam;
