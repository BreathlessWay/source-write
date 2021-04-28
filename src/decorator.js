function readonly(target, key, description) {
    description.writable = false;
}

class De {
    @readonly
    enter = "222";
}

const de = new De();
console.log(de.enter);
de.enter = "111";