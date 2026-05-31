// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {

    return function(value) {

        return fns.reduce((result, fn) => {
            return fn(result);
        }, value);

    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));


// 2. memoize() — Cache kết quả
function memoize(fn) {

    const cache = {};

    return function(...args) {

        const key = JSON.stringify(args);

        if (cache[key]) {
            console.log("Lấy từ cache...");
            return cache[key];
        }

        const result = fn(...args);

        cache[key] = result;

        return result;
    };
}

const expensiveCalc = memoize((n) => {

    console.log("Đang tính...");

    let result = 0;

    for (let i = 0; i < n; i++) {
        result += i;
    }

    return result;
});

console.log(expensiveCalc(1000000));

console.log(expensiveCalc(1000000));


// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {

    let timeoutId;

    return function(...args) {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Gọi liên tục
search("ip");
search("iphone");
search("iphone 16");


// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {

        try {

            return await fn();

        } catch (error) {

            console.log(
                `Lần ${attempt} thất bại: ${error.message}`
            );

            if (attempt === maxAttempts) {
                throw new Error("Đã thử tối đa số lần");
            }
        }
    }
}


// ================= TEST RETRY =================

let count = 0;

async function fakeApi() {

    count++;

    if (count < 3) {
        throw new Error("API lỗi");
    }

    return "Kết nối thành công!";
}

retry(fakeApi)
    .then(result => console.log(result))
    .catch(error => console.log(error.message));