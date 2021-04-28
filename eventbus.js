class Eventbus {
    constructor() {
        this.listener = {};
    }

    on(eventName, handler) {
        if (!this.listener[eventName]) {
            this.listener[eventName] = new Set();
        }
        this.listener[eventName].add(handler);
    }

    once(eventName, handler) {
        const fun = (...args) => {
            handler.apply(this, args);
            this.off(eventName);
        };
        if (!this.listener[eventName]) {
            this.listener[eventName] = new Set();
        }
        this.listener[eventName].add(fun);
    }

    off(eventName) {
        delete this.listener[eventName];
    }

    hasEvent(eventName) {
        return this.listener[eventName] && this.listener[eventName].size;
    }

    trigger(eventName, ...args) {
        if (this.hasEvent(eventName)) {
            const handlers = this.listener[eventName];
            handlers.forEach(handler => {
                handler.apply(this, args);
            });
        } else {
            throw new Error(`事件 ${eventName} 尚未注册`);
        }
    }
}

const e = new Eventbus();

e.on("a", () => {
    console.log(111);
});
e.on("a", () => {
    console.log(222);
});
e.on("a", () => {
    console.log(113331);
});
e.on("a", () => {
    console.log(444);
});

e.on("b", () => {
    console.log("bbb");
});

e.on("c", () => {
    console.log("ccc");
    console.log(this);
});

e.once("d", (mm, nn, ll) => {
    console.log(mm + "ddd" + nn + ll);
});

e.trigger("a");
e.trigger("b");
e.trigger("c");
e.trigger("d", "qq", "pp", "oo");

e.trigger("d");

e.off("a");

e.trigger("a");