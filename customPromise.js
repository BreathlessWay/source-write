const PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected";

class CustomPromise {
    constructor(executor) {
        this.state = PENDING;
        this.value = "";
        this.reason = null;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        try {
            executor(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }

    static resolve = (value) => {
        return new CustomPromise(resolve => resolve(value));
    };

    static reject = (reason) => {
        return new CustomPromise((resolve, reject) => reject(reason));
    };

    resolve = (value) => {
        if (this.state === PENDING) {
            this.state = FULFILLED;
            this.value = value;
            this.onFulfilledCallbacks.forEach(fn => fn(value));
        }
    };

    reject = (reason) => {
        if (this.state === PENDING) {
            this.state = REJECTED;
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fn => fn(reason));
        }
    };

    then = (onFulFilled, onRejected) => {
        if (typeof onFulFilled !== "function") {
            onFulFilled = function (value) {
                return value;
            };
        }
        if (typeof onRejected !== "function") {
            onRejected = function (reason) {
                throw reason;
            };
        }
        const promise2 = new CustomPromise((resolve, reject) => {
            switch (this.state) {
                case PENDING: {
                    this.onFulfilledCallbacks.push(() => setTimeout(() => {
                        try {
                            resolve(onFulFilled(this.value));
                        } catch (e) {
                            reject(e);
                        }
                    }, 0));
                    this.onRejectedCallbacks.push(() => setTimeout(() => {
                        try {
                            reject(onRejected(this.reason));
                        } catch (e) {
                            reject(e);
                        }
                    }, 0));
                    break;
                }
                case FULFILLED: {
                    setTimeout(() => {
                        try {
                            resolve(onFulFilled(this.value));
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                    break;
                }
                case REJECTED: {
                    setTimeout(() => {
                        try {
                            reject(onRejected(this.reason));
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                    break;
                }
            }
        });
        return promise2;
    };

    catch = (onReject) => {
        return this.then(null, onReject);
    };

    finally = (fn) => {
        return this.then(value => {
            fn();
            return value;
        }, reason => {
            fn();
            throw reason;
        });
    };
}

