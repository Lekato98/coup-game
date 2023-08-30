import {ServiceEvent} from './service-event.ts';

interface EventManager {
    on(event: ServiceEvent, listener: (...args: any[]) => void): void;
    onAny(listener: (...args: any[]) => void): void;
    emit(event: ServiceEvent, ...args: any[]): void;
}

export {
    EventManager
}