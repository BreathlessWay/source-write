const listener = (function () {
    let prePath = location.href;
    return function (cb) {
        if (!history.state) {
            cb(document.referrer);
            return;
        }
        const historyProxy = (methodName) => {
            const originMethod = history[methodName];

            return function () {
                cb(prePath);
                prePath = location.href;
                originMethod.apply(this, arguments);
            };
        };

        history.pushState = historyProxy("pushState");
        history.replaceState = historyProxy("replaceState");

        window.onpopstate = function () {
            cb(prePath);
            prePath = location.href;
        };

        window.onhashchange = function () {
            cb(prePath);
            prePath = location.href;
        };
    };
})();

listener((referrer) => console.log(referrer));