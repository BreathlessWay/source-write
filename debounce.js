// 防抖：执行最后一次
const debounce = (fun, time = 300, immediately) => {
    let timer;
    return (...args) => {
        if (immediately) {
            fun(args);
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fun(args);
        }, time);
    };
};

debounce(() => {
    console.log(1);
}, 1000, true);