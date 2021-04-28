const curry = (func, ...args) => {
    const argsLength = args.length,
        funcArgsLength = func.length
    console.log(argsLength, funcArgsLength);
    if (argsLength < funcArgsLength) {
        return (...args2) => curry(func, ...args, ...args2)
    } else {
        return func(...args)
    }
}

function a() {
    console.log(1)
}

console.log(curry(a));