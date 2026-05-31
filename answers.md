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