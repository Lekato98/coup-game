import {EventEmitter} from 'events';
import {EventManager} from './event-manager.ts';
import {ServerToClientEvent} from './server-to-client-event.ts';
import {ServiceEvent} from './service-event.ts';

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