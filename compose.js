const compose = (...func) => {
    return function (...args) {
        return func.reduceRight((previousValue, currentValue) => {
            return typeof previousValue === "function" ? currentValue(previousValue(...args)) : currentValue(previousValue);
        });
    };
};


function fn1(x) {
    return x + 1;
}

function fn2(x) {
    return x * 10;
}

function fn3(x) {
    return x - 1;
}

let x = 10;
let result = compose(fn3, fn2, fn1)(x);

console.log(result);