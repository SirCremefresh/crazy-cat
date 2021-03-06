export class Observable<E> {
    observers = [];

    subscribe(f: (data: E | void) => any) {
        this.observers.push(f);
    }

    unsubscribe(f: (data: E | void) => any) {
        this.observers = this.observers.filter(subscriber => subscriber !== f);
    }

    emit(data: E) {
        this.observers.forEach(observer => observer(data));
    }
}
