// =============================================
// Order History Save Function (Global Scope)
// =============================================
function saveOrder(orderData) {
    try {
        let orders = JSON.parse(localStorage.getItem('coffeeShopOrders') || "[]");
        if (!Array.isArray(orders)) {
            console.warn("Existing orders data was not an array, resetting");
            orders = [];
        }
        orders.push(orderData);
        localStorage.setItem('coffeeShopOrders', JSON.stringify(orders));
        console.log("Order saved to history:", orderData);
        return true;
    } catch (error) {
        console.error("Error saving order:", error);
        return false;
    }
}

// =============================================
// Main Checkout Logic
// =============================================
document.addEventListener("DOMContentLoaded", function () {
    const orderListElement = document.getElementById("order-list");
    const totalPriceElement = document.getElementById("total-price");
    const confirmPaymentButton = document.getElementById("confirm-payment");
    const addMoreButton = document.getElementById("add-more");
    const body = document.body;

    // Retrieve current order from localStorage
    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

    // Display order items
    orderList.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₱${item.price.toFixed(2)}`;
        orderListElement.appendChild(li);
    });

    // Display total price
    totalPriceElement.textContent = `Total: ₱${totalPrice.toFixed(2)}`;

    // =============================================
    // Confirm Payment Button Handler
    // =============================================
    confirmPaymentButton.addEventListener("click", function () {
        const automaticPaymentMethod = "Cash";
        
        // Create complete order data for history
        const completeOrderData = {
            id: Date.now(),
            orderType: "Dine-in",
            items: orderList.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity || 1  // Ensure quantity exists
            })),
            total: totalPrice,
            paymentMethod: automaticPaymentMethod,
            timestamp: new Date().toISOString()
        };

        // Save to order history
        if (saveOrder(completeOrderData)) {
            // Store receipt data separately
            localStorage.setItem("receiptOrderList", JSON.stringify(orderList));
            localStorage.setItem("receiptTotalPrice", totalPrice.toFixed(2));
            localStorage.setItem("receiptPaymentMethod", automaticPaymentMethod);

            alert(`Payment confirmed via ${automaticPaymentMethod}!\nTotal: ₱${totalPrice.toFixed(2)}`);

            // Animation before redirect
            body.classList.add("pull-down-exit");
            setTimeout(() => {
                localStorage.removeItem("orderList"); // Clear current cart
                localStorage.removeItem("totalPrice");
                window.location.href = "receipt.html";
            }, 500);
        } else {
            alert("Failed to save order. Please try again.");
        }
    });

    // =============================================
    // Add More Button Handler
    // =============================================
    addMoreButton.addEventListener("click", function () {
        body.classList.add("pull-down-exit");
        setTimeout(() => {
            window.location.href = "dine.html";
        }, 500);
    });
});
// In your confirmPaymentButton click handler:
confirmPaymentButton.addEventListener("click", function () {
    // Generate a consistent timestamp-based ID
    const orderId = Date.now().toString(); // Convert to string to match your example
    
    // Store the ID along with other receipt data
    localStorage.setItem("receiptOrderId", orderId);
    
    // ... rest of your existing code ...
});
// When completing an order:
const orderId = Date.now().toString(); // Same format as your example
localStorage.setItem("receiptOrderId", orderId);
// For Dine-in:
const orderData = {
    orderType: 'Dine-in',
    // ... other properties
};