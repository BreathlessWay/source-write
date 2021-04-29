const stack = (source) => {
    const cache = [],
        sourceArray = source.split(""),
        sourceArrayLength = sourceArray.length;

    for (let i = 0; i < sourceArrayLength; i++) {
        const item = sourceArray[i];
        switch (item) {
            case "(":
            case "{":
            case "[": {
                cache.push(item);
                break;
            }
            case ")": {
                const lastItem = cache.pop();
                if (lastItem !== "(") {
                    throw new Error("不对称");
                }
                break;
            }
            case "}": {
                const lastItem = cache.pop();
                if (lastItem !== "{") {
                    throw new Error("不对称");
                }
                break;
            }
            case "]": {
                const lastItem = cache.pop();
                if (lastItem !== "[") {
                    throw new Error("不对称");
                }
                break;
            }
            default: {

            }
        }
    }

    console.log("对称");
};

const data = "[{()}]";

stack(data);