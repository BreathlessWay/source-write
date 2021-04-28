// WeakMap只能用对象作为索引，并且为弱引用
const deepClone = (obj, cache = new WeakMap) => {
    if (cache.get(obj)) return cache.get(obj)

    let res
    if (typeof obj === 'function') {
        res = function () {
            return obj.apply(this, arguments)
        }
        cache.set(obj, res)
        return res
    }

    if (typeof obj === 'object') {
        if (obj instanceof RegExp) {
            res = new RegExp(obj.source, obj.flags)
        } else if (obj instanceof Date) {
            res = new Date(obj)
        } else {
            if (obj instanceof Array) {
                res = []
            } else {
                res = {}
            }
            for (let p in obj) {
                res[p] = deepClone(obj[p], cache)
            }
        }
        cache.set(obj, res)
        return res
    }

    return obj
}

const mm = {
    a: 11, b: [{l: 5}], c: () => {
    }
}

const nn = deepClone(mm)
mm.b[0].l = '000'
console.log(mm);
console.log(nn);