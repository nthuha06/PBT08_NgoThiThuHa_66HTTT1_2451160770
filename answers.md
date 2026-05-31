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

