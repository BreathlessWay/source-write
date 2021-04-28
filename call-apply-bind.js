Function.prototype.customCall = function (context, ...args) {
    // 接受 n 个参数
    if (this === Function.prototype) {
        throw new TypeError("");  // 防止直接调用
    }
    context = context || window;
    context.fn = this;

    const res = context.fn(...args);

    delete context.fn;

    return res;
};

Function.prototype.customApply = function (context, args) {
    // 接受数组参数
    if (this === Function.prototype) {
        throw new TypeError("");  // 防止直接调用
    }
    context = context || window;

    context.fn = this;

    const res = args && Array.isArray(args) ? context.fn(...args) : context.fn();

    delete context.fn;

    return res;
};

Function.prototype.customBind = function (context) {
    if (this === Function.prototype) {
        throw new TypeError("");  // 防止直接调用
    }

    const _this = this;
    return function F(...args) {
        if (_this instanceof F) {
            return new _this(...args);
        }

        return _this.apply(context, args);
    };
};