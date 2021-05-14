const listener = (function () {
    let prePath = location.href, hasChange = false;
    return function (cb) {
        if (!history.state) {
            cb(document.referrer);
            return;
        }
        const historyProxy = (methodName) => {
            const originMethod = history[methodName];

            return function () {
                console.log(methodName, prePath);
                cb(prePath);
                prePath = location.href;
                originMethod.apply(this, arguments);
            };
        };

        history.pushState = historyProxy("pushState");
        history.replaceState = historyProxy("replaceState");

        window.onpopstate = function () {
            console.log("onpopstate", prePath);
            cb(prePath);
            prePath = location.href;
        };

        window.onhashchange = function () {
            console.log("onhashchange", prePath);
            cb(prePath);
            prePath = location.href;
        };
    };
})();