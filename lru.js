const isInteger = (num) => {
    return typeof num === "number" && num % 1 === 0;
};

class Item {
    constructor({data, quality}) {
        const MinQuality = 0,
            MaxQuality = 5;
        quality = quality || MinQuality;

        if (isInteger(quality) && quality >= MinQuality && quality <= MaxQuality) {
            this.data = data;
            this.quality = quality;
        } else {
            throw new Error(`缓存权重需要在 ${MinQuality}-${MaxQuality} 之间，且须为整数`);
        }
    }
}

class Lru {
    constructor(maxLength) {
        this.maxLength = maxLength || 10;
        this.data = new Set();
    }

    get size() {
        return this.data.size;
    }

    put = (item) => {
        const _item = new Item(item);
        if (this.size >= this.maxLength) {
            const _deleteItem = [...this.data].reduce((pre, _) => {
                if (pre) {
                    return pre.quality > _.quality ? _ : pre;
                }
                return _;
            }, null);
            this.data.delete(_deleteItem);
        }
        this.data.add(_item);
    };

    pop = () => {
        if (this.size) {
            const _item = [...this.data][0];
            this.data.delete(_item);
            console.log(this.data);
            return _item;
        }
    };
}

const lru = new Lru();

lru.put({data: 111});
lru.put({data: 222});
lru.put({data: 333});

console.log(lru.pop());
console.log(lru.pop());
console.log(lru.pop());
console.log(lru.pop());