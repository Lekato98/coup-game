import {EventEmitter} from 'events';
import {EventManager} from './event-manager.ts';

class DefaultEventManager implements EventManager {
    constructor(private readonly eventEmitter: EventEmitter) {
    }

    public on(event: string, listener: (...args: any[]) => void) {
        this.eventEmitter.on(event, listener);
    }

    public emit(event: string, ...args: any[]) {
        this.eventEmitter.emit(event, ...args);
    }
}

export {
    DefaultEventManager
}