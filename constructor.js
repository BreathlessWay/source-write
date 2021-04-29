class A {

}

console.log(A.constructor);  // 指向Function

console.log(A.prototype.constructor);  // 指向自身

const a = new A()

console.log(a.constructor)  // 指向原型A

function M(){

}

console.log(M.constructor);  // 指向Function

console.log(M.prototype.constructor);  // 指向自身

const m = new M()

console.log(m.constructor)  // 指向原型M