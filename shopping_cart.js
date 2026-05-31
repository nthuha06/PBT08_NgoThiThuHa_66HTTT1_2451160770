function createCart() {

    // Private data
    let items = [];
    let discount = 0;
    let fixedDiscount = 0;

    return {

        // Thêm sản phẩm
        addItem(product, quantity = 1) {

            const existingItem = items.find(
                item => item.id === product.id
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({
                    ...product,
                    quantity
                });
            }
        },

        // Xóa sản phẩm
        removeItem(productId) {
            items = items.filter(
                item => item.id !== productId
            );
        },

        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {

            const item = items.find(
                item => item.id === productId
            );

            if (item) {
                item.quantity = newQuantity;
            }
        },

        // Tính tổng tiền
        getTotal() {

            const subtotal = items.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);

            const percentDiscount = subtotal * discount;

            return subtotal - percentDiscount - fixedDiscount;
        },

        // Áp dụng mã giảm giá
        applyDiscount(code) {

            discount = 0;
            fixedDiscount = 0;

            if (code === "SALE10") {
                discount = 0.1;
            }

            else if (code === "SALE20") {
                discount = 0.2;
            }

            else if (code === "FREESHIP") {
                fixedDiscount = 30000;
            }
        },

        // In giỏ hàng
        printCart() {

            console.log("\n=== SHOPPING CART ===");

            console.table(
                items.map(item => ({
                    ID: item.id,
                    "Sản phẩm": item.name,
                    "Số lượng": item.quantity,
                    "Đơn giá": item.price.toLocaleString() + "đ",
                    "Thành tiền":
                        (item.price * item.quantity).toLocaleString() + "đ"
                }))
            );

            console.log(
                "Tổng cộng:",
                this.getTotal().toLocaleString() + "đ"
            );
        },

        // Tổng số sản phẩm
        getItemCount() {

            return items.reduce((total, item) => {
                return total + item.quantity;
            }, 0);
        },

        // Xóa toàn bộ giỏ hàng
        clearCart() {
            items = [];
            discount = 0;
            fixedDiscount = 0;
        }
    };
}

// ================= TEST =================

const cart = createCart();

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

cart.addItem(
    { id: 3, name: "AirPods Pro", price: 6990000 },
    2
);

cart.addItem(
    { id: 1, name: "iPhone 16", price: 25990000 },
    1
);

// In giỏ hàng
cart.printCart();

// Giảm giá 10%
cart.applyDiscount("SALE10");

console.log("\n=== AFTER DISCOUNT ===");

cart.printCart();

// Tổng số sản phẩm
console.log(
    "\nSố SP:",
    cart.getItemCount()
);

// Xóa sản phẩm
cart.removeItem(3);

console.log(
    "\nSau xóa:",
    cart.getItemCount()
);

// Cập nhật số lượng
cart.updateQuantity(1, 5);

console.log("\n=== AFTER UPDATE QUANTITY ===");

cart.printCart();

// Xóa toàn bộ
cart.clearCart();

console.log("\n=== AFTER CLEAR CART ===");

cart.printCart();