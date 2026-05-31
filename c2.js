const miniArray = {

    // map()
    map(arr, fn) {

        const result = [];

        for (let i = 0; i < arr.length; i++) {

            result.push(
                fn(arr[i], i, arr)
            );
        }

        return result;
    },

    // filter()
    filter(arr, fn) {

        const result = [];

        for (let i = 0; i < arr.length; i++) {

            if (fn(arr[i], i, arr)) {

                result.push(arr[i]);
            }
        }

        return result;
    },

    // reduce()
    reduce(arr, fn, initialValue) {

        let accumulator = initialValue;

        for (let i = 0; i < arr.length; i++) {

            accumulator = fn(
                accumulator,
                arr[i],
                i,
                arr
            );
        }

        return accumulator;
    }
};


// ================= TEST =================

console.log(
    miniArray.map(
        [1, 2, 3],
        x => x * 2
    )
);
// → [2, 4, 6]

console.log(
    miniArray.filter(
        [1, 2, 3, 4],
        x => x > 2
    )
);
// → [3, 4]

console.log(
    miniArray.reduce(
        [1, 2, 3, 4],
        (a, b) => a + b,
        0
    )
);
// → 10