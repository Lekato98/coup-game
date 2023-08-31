import {EventEmitter} from 'events';
import {ServiceEvent, EventManager} from '.';

class DefaultEventManager implements EventManager {
    constructor(private readonly eventEmitter: EventEmitter) {
    }

    public on(event: ServiceEvent, listener: (...args: any[]) => void) {
        this.eventEmitter.on(event, listener);
    }

    public onAny(listener: (...args: any[]) => void) {
        Object.keys(ServiceEvent).forEach(event => this.eventEmitter.on(event, listener));
    }

    public emit(event: ServiceEvent, ...args: any[]) {
        console.info(`[${DefaultEventManager.name}] Broadcasting [${event}] event to all listeners`);
        this.eventEmitter.emit(event, ...args);
    }
}

export {
    DefaultEventManager
}