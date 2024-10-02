import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Logger')
export class Logger {
    // Standard log with custom styling
    public static log(...args) {
        if (args.length === 0) return; // Handle case with no arguments
        const tag = args.shift() || '[No Tag]'; // Remove the first argument as the tag, default if not provided
        args.unshift('background:rgb(51,51,51); color: #bdbdbd;font-size: 12px; padding: 0;');
        args.unshift(`%c[${tag}] ▶ `);
        return console.log.apply(console, args);
    }
    // Warning log with custom styling
    public static warn(...args) {
        if (args.length === 0) return; // Handle case with no arguments
        const tag = args.shift() || '[No Tag]'; // Remove the first argument as the tag, default if not provided
        args.unshift('background:rgb(51,51,51); color: #bdbdbd;font-size: 12px; padding: 0;');
        args.unshift(`%c[${tag}] ▶ `);
        return console.warn.apply(console, args);
    }
    // Error log with custom styling
    public static error(...args) {
        if (args.length === 0) return; // Handle case with no arguments
        const tag = args.shift() || '[No Tag]'; // Remove the first argument as the tag, default if not provided
        args.unshift('background:rgb(51,51,51); color: #bdbdbd;font-size: 12px; padding: 0;');
        args.unshift(`%c[${tag}] ▶ `);
        return console.error.apply(console, args);
    }
}


