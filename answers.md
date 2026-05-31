# Phần A
## Câu A1 - Function Declaration vs Expression vs Arrow
### Viết hàm và cho ví dụ
#### Function Declaration
```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
}
```

Giải thích:

Nếu lương lớn hơn 11 triệu thì tính thuế 10%.
Nếu lương nhỏ hơn hoặc bằng 11 triệu thì thuế bằng 0.
Hàm trả về object gồm:
thue
thuc_nhan

Ví dụ:
```javascript
console.log(tinhThueBaoHiem(15000000));
```
Kết quả:
```javascript
{ thue: 1500000, thuc_nhan: 13500000 }
```
#### Function Expression
```javascript
const tinhThueBaoHiem2 = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
};
```
Giải thích:

Function được gán vào biến const.
Cách viết này thường dùng khi muốn lưu function vào biến.

Ví dụ:
```javascript
console.log(tinhThueBaoHiem2(12000000));
```
Kết quả:
```javascript
{ thue: 1200000, thuc_nhan: 10800000 }
```
#### Arrow Function
```javascript
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue: thue,
        thuc_nhan: luong - thue
    };
};
```
Giải thích:

Đây là cú pháp arrow function của ES6.
Cách viết ngắn gọn và hiện đại hơn function thông thường.

Ví dụ:
```javascript
console.log(tinhThueBaoHiem3(10000000));
```
Kết quả:
```javascript
{ thue: 0, thuc_nhan: 10000000 }
```

#### Hoisting của 3 cách viết function
* Function Declaration
hello();

function hello() {
    console.log("Hello");
}

Kết quả:

Hello

Giải thích:

Function Declaration được hoisting hoàn toàn.
Có thể gọi hàm trước khi khai báo.

* Function Expression
test();

const test = function() {
    console.log("Test");
};

Kết quả:

ReferenceError

Giải thích:

Function Expression không được hoisting hoàn toàn.
Không thể gọi trước khi khai báo.

* Arrow Function
sayHi();

const sayHi = () => {
    console.log("Hi");
};

Kết quả:

ReferenceError

Giải thích:

Arrow Function cũng không được hoisting hoàn toàn.
Không thể gọi trước khi khai báo.

## Câu A2 - Scope & Closure
### Dự đoán kết quả
#### Output đoạn 1
```javascript
1
2
3
2
2
```

#### Giải thích đoạn 1

Hàm `counter()` tạo ra biến `count` bên trong function:

```javascript
function counter() {
    let count = 0;
```

Sau đó hàm trả về object chứa các function:

```javascript
return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
};
```

Các function này vẫn nhớ được biến `count` dù hàm `counter()` đã chạy xong. Đây gọi là Closure.

Closure là:

> Hàm con có thể truy cập biến của hàm cha ngay cả khi hàm cha đã thực thi xong.

Phân tích từng dòng:

```javascript
console.log(c.increment());
```

* count từ 0 → 1
* trả về 1

Kết quả:

```javascript
1
```

Tiếp theo:

```javascript
console.log(c.increment());
```

* count từ 1 → 2

Kết quả:

```javascript
2
```

Tiếp theo:

```javascript
console.log(c.increment());
```

* count từ 2 → 3

Kết quả:

```javascript
3
```

Tiếp theo:

```javascript
console.log(c.decrement());
```

* count từ 3 → 2

Kết quả:

```javascript
2
```

Cuối cùng:

```javascript
console.log(c.getCount());
```

* lấy giá trị hiện tại của count
* count đang bằng 2

Kết quả:

```javascript
2
```

#### Output đoạn 2

```javascript
var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
```

#### Giải thích đoạn 2

##### Trường hợp `var`

```javascript
for (var i = 0; i < 3; i++)
```

`var` sử dụng function scope nên toàn bộ vòng lặp chỉ dùng chung một biến `i`.

Quá trình chạy thực tế:

```javascript
i = 0
i = 1
i = 2
i = 3
```

Sau khi vòng lặp kết thúc thì callback của `setTimeout` mới chạy. Lúc này giá trị của `i` đã bằng 3 nên cả 3 lần đều in ra:

```javascript
var: 3
```

##### Trường hợp `let`

```javascript
for (let j = 0; j < 3; j++)
```

`let` sử dụng block scope nên mỗi vòng lặp sẽ tạo ra một biến `j` riêng.

| Vòng lặp | Giá trị |
| -------- | ------- |
| 1        | 0       |
| 2        | 1       |
| 3        | 2       |

Mỗi callback của `setTimeout` sẽ nhớ đúng giá trị của từng vòng lặp nên kết quả là:

```javascript
let: 0
let: 1
let: 2
```

## Câu A3 - Array Methods

### 1. Lấy các số chẵn

```javascript id="t0e5bc"
const evenNumbers = nums.filter(num => num % 2 === 0);

console.log(evenNumbers);
```

Kết quả:

```javascript id="55f4f0"
[2, 4, 6, 8, 10]
```

Giải thích:

* `filter()` dùng để lọc phần tử.
* `num % 2 === 0` nghĩa là số chẵn.
* Các số chẵn sẽ được giữ lại trong mảng mới.

### 2. Nhân mỗi số với 3

```javascript id="m18vhf"
const multiplied = nums.map(num => num * 3);

console.log(multiplied);
```

Kết quả:

```javascript id="3x5n1e"
[3, 6, 9, 12, 15, 18, 21, 24, 27, 30]
```

Giải thích:

* `map()` dùng để biến đổi từng phần tử.
* Mỗi số được nhân với 3.
* Trả về mảng mới sau khi xử lý.

### 3. Tính tổng tất cả phần tử

```javascript id="e1j6wk"
const total = nums.reduce((sum, num) => sum + num, 0);

console.log(total);
```

Kết quả:

```javascript id="9vdq9m"
55
```

Giải thích:

* `reduce()` dùng để gộp các phần tử thành 1 giá trị.
* `sum` là biến cộng dồn.
* `0` là giá trị khởi tạo ban đầu.

Quá trình tính:

```javascript id="cljofe"
0 + 1 = 1
1 + 2 = 3
3 + 3 = 6
...
```

Cuối cùng được:

```javascript id="ybrf38"
55
```

### 4. Tìm số đầu tiên lớn hơn 7

```javascript id="vex4yr"
const firstGreaterThan7 = nums.find(num => num > 7);

console.log(firstGreaterThan7);
```

Kết quả:

```javascript id="tn0hdk"
8
```

Giải thích:

* `find()` trả về phần tử đầu tiên thỏa điều kiện.
* Số đầu tiên lớn hơn 7 là 8.

### 5. Kiểm tra có số lớn hơn 10 không

```javascript id="ns8rzi"
const hasGreaterThan10 = nums.some(num => num > 10);

console.log(hasGreaterThan10);
```

Kết quả:

```javascript id="5e6u3r"
false
```

Giải thích:

* `some()` kiểm tra có ít nhất 1 phần tử thỏa điều kiện hay không.
* Trong mảng không có số nào lớn hơn 10.
* Nên kết quả là `false`.

### 6. Kiểm tra tất cả đều lớn hơn 0

```javascript id="hj8vf6"
const allPositive = nums.every(num => num > 0);

console.log(allPositive);
```

Kết quả:

```javascript id="8w5lnn"
true
```

Giải thích:

* `every()` kiểm tra tất cả phần tử có thỏa điều kiện không.
* Tất cả các số đều lớn hơn 0.
* Nên kết quả là `true`.

### 7. Tạo mảng "Số X là chẵn/lẻ"

```javascript id="l0c96z"
const descriptions = nums.map(
    num => `Số ${num} là ${num % 2 === 0 ? "chẵn" : "lẻ"}`
);

console.log(descriptions);
```

Kết quả:

```javascript id="b0v2r2"
[
  "Số 1 là lẻ",
  "Số 2 là chẵn",
  "Số 3 là lẻ",
  ...
]
```

Giải thích:

* Dùng `map()` để tạo chuỗi mới cho từng phần tử.
* Dùng toán tử `? :` để kiểm tra chẵn hoặc lẻ.

### 8. Đảo ngược mảng nhưng không thay đổi mảng gốc

```javascript id="z8j4qm"
const reversed = [...nums].reverse();

console.log(reversed);
```

Kết quả:

```javascript id="75yb1p"
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

Giải thích:

* `reverse()` sẽ làm thay đổi mảng gốc.
* Dùng spread operator `...nums` để copy mảng trước.
* Sau đó mới đảo ngược mảng copy.

Mảng gốc vẫn giữ nguyên:

```javascript id="0y2m6t"
console.log(nums);
```

Kết quả:

```javascript id="4j0e0w"
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## Câu A4 - Object Destructuring & Spread
### Output phần Destructuring

```javascript id="j8f0u5"
iPhone 16 25990000 8 Titan
ReferenceError: specs is not defined
```

* Giải thích Destructuring

#### Đoạn code:

```javascript id="w4m2nr"
const { name, price, specs: { ram, color } } = product;
```

Destructuring giúp lấy dữ liệu từ object nhanh hơn.

Các giá trị được lấy ra:

| Biến  | Giá trị     |
| ----- | ----------- |
| name  | "iPhone 16" |
| price | 25990000    |
| ram   | 8           |
| color | "Titan"     |

#### Dòng này:

```javascript id="x3lprn"
console.log(name, price, ram, color);
```

Kết quả:

```javascript id="y9t8zt"
iPhone 16 25990000 8 Titan
```

#### Dòng này:

```javascript id="r3d4y6"
console.log(specs);
```

Sẽ lỗi:

```javascript id="d7v9z1"
ReferenceError: specs is not defined
```

Giải thích:

Trong destructuring:

```javascript id="rf7fwp"
specs: { ram, color }
```

ta chỉ lấy:

* `ram`
* `color`

Biến `specs` không được tạo ra nên không thể dùng bên ngoài.

---

### Output phần Spread

```javascript id="pr0txu"
23990000
true
25990000
```

---

* Giải thích Spread

#### Đoạn code:

```javascript id="94bxkr"
const updated = { ...product, price: 23990000, sale: true };
```

Spread operator `...product` dùng để copy object.

Sau đó:

* ghi đè `price`
* thêm thuộc tính mới `sale`

#### Dòng này:

```javascript id="7j7mdf"
console.log(updated.price);
```

Kết quả:

```javascript id="qwwn1p"
23990000
```

Vì giá đã được cập nhật.

#### Dòng này:

```javascript id="b1t0u6"
console.log(updated.sale);
```

Kết quả:

```javascript id="jl8s0q"
true
```

Vì object mới có thêm thuộc tính `sale`.

#### Dòng này:

```javascript id="0gk2ku"
console.log(product.price);
```

Kết quả:

```javascript id="2my6nh"
25990000
```

Giải thích:

Spread tạo object mới nên object gốc không bị thay đổi.

### Output phần Spread Gotcha

```javascript id="5oyj1n"
16
```

* Giải thích

#### Đoạn code:

```javascript id="cw6yxq"
const copy = { ...product };
```

Spread chỉ copy shallow copy.

Nghĩa là:

* level đầu được copy mới
* object lồng bên trong vẫn dùng chung reference

---

#### Đoạn này:

```javascript id="n9o0i7"
copy.specs.ram = 16;
```

đã sửa trực tiếp object `specs`.

Vì:

```javascript id="mxwrr6"
copy.specs === product.specs
```

nên khi sửa `copy.specs.ram` thì `product.specs.ram` cũng đổi theo.

---

#### Dòng này:

```javascript id="8ub1dw"
console.log(product.specs.ram);
```

Kết quả:

```javascript id="5st8gq"
16
```

# Phần C
## Câu C1 — Refactor Code
### Refactor Code

```js
const processOrders = (orders) =>
    orders
        .filter(
            order =>
                order.status === "completed" &&
                order.total > 100000
        )
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total - total * 0.1
        }))
        .sort(
            (a, b) => b.finalTotal - a.finalTotal
        );
```

### Giải thích
- Dùng filter() để lọc đơn hàng completed và total > 100000
- Dùng map() để tạo object mới chứa id, customer, total, discount, finalTotal
- Dùng destructuring để lấy dữ liệu ngắn gọn hơn
- Dùng arrow function giúp code hiện đại, dễ đọc
- Dùng sort() để sắp xếp finalTotal giảm dần

## Câu C2 — Thiết kế API miniArray

### Ý tưởng

Tự xây dựng lại:

- map()
- filter()
- reduce()

mà không dùng built-in methods của JavaScript.

### Giải thích

#### map()

- Duyệt từng phần tử bằng vòng lặp
- Gọi callback function fn()
- Push kết quả mới vào mảng result

#### filter()

- Duyệt từng phần tử
- Nếu điều kiện đúng → thêm vào result
- Sai → bỏ qua

#### reduce()

- Dùng accumulator để lưu giá trị tích lũy
- Mỗi vòng lặp cập nhật accumulator
- Trả về kết quả cuối cùng