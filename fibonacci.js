const fibonacciRecursion = (num) => {
    if (num === 1 || num === 2) {
        return 1;
    }

    return fibonacciRecursion(num - 1) + fibonacciRecursion(num - 2);
};

console.log(fibonacciRecursion(8));

const fibonacciWhile = num => {
    if (num === 1 || num === 2) {
        return 1;
    }

    let pre = 1, current = 1;

    while (num > 2) {
        let mid = pre;
        pre = current;
        current = mid + current;
        num--;
    }

    return current;
};

console.log(fibonacciWhile(8));