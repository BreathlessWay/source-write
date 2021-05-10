class RequestControl {
    constructor(urls, max) {
        this.max = max || 10;

        this.currentIndex = 0;

        this.urls = urls;

        this.result = [];
    }

    splitToQueue = () => {
        const result = [],
            urlLength = this.urls.length;
        for (let i = 0; i < urlLength; i += this.max) {
            result.push(this.urls.slice(i, i + this.max));
        }

        return result;
    };

    fetchQueue = (queue) => {
        const _q = queue[this.currentIndex].map(
            (url, index) => new Promise(
                (resolve, reject) => setTimeout(
                    () => resolve(url + " resolve"), index * 1000)));
        return Promise.all(_q);
    };

    request = () => {
        const queue = this.splitToQueue(),
            queueLength = this.splitToQueue().length;

        return this.fetchQueue(queue).then(res => {
            this.result = this.result.concat(res);
            this.currentIndex++;
            if (this.currentIndex < queueLength) {
                return this.request();
            } else {
                return this.result;
            }
        });
    };
}

const requestControl = new RequestControl(["1", "2", "3", "4", "5", "6"], 4);

requestControl.request().then(res => console.log(res));