const customNew = (Func, ...args) => {
    // 创建一个空的简单JavaScript对象
    const obj = Object.create({})
    // 链接该对象到prototype
    obj.__proto__ = Func.prototype
    // 将创建的对象作为this的上下文
    const res = Func.apply(obj, args)
    // 如果该函数没有返回对象，则返回this
    return res instanceof Object ? res : obj
}

function A(){

}

console.log(customNew(A));

console.log(new A);