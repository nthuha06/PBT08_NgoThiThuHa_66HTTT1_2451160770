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