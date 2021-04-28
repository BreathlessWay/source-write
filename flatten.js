const flat = (array) => {
    let result = [];

    array.forEach(item => {
        if (Array.isArray(item)) {
            result = result.concat(flat(item));
        } else {
            result.push(item);
        }
    });

    return result;
};

const flatten = (array) => {
    return array.reduce((target, current) => {
        if (Array.isArray(current)) {
            return target.concat(flatten(current));
        } else {
            target.push(current);
            return target;
        }
    }, []);
};

const data = flatten([[1, 2], [3, [4, 5], 6, [7, 8]], 9]);

console.log(data);
