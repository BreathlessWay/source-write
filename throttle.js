// 节流：执行第一次

const throttle = (fun, time = 300) => {
    let timer
    return (...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                fun(args)
            }, time)
        }
    }
}

const f = throttle(() => {
    console.log(1)
})

f()
f()
f()
f()