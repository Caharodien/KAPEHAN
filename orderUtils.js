// orderUtils.js
function saveOrder(orderData) {
    try {
        let orders = JSON.parse(localStorage.getItem('coffeeShopOrders') || "[]");
        if (!Array.isArray(orders)) {
            console.warn("Existing orders data was not an array, resetting");
            orders = [];
        }
        orders.push(orderData);
        localStorage.setItem('coffeeShopOrders', JSON.stringify(orders));
        console.log("Order saved successfully:", orderData);
        return true;
    } catch (error) {
        console.error("Error saving order:", error);
        return false;
    }
}