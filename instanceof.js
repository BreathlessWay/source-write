class A {

}

class B extends A {
    constructor() {
        super();
    }
}


const customInstanceof = (target, origin) => {
    let proto = target.__proto__, index = 0
    while (proto !== origin.prototype) {
        proto = proto.__proto__
        if (!proto) {
            return false
        }
        index += 1
    }

    console.log(index);
    return true
}

console.log(customInstanceof(new B(), Object));