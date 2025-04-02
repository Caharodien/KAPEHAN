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

// Generate a 7-digit order number with D prefix
function generateOrderNumber() {
    const timestamp = Date.now().toString();
    // Get last 6 digits of timestamp + random 1 digit to make 7 digits
    const orderNum = 'D' + timestamp.slice(-6) + Math.floor(Math.random() * 10);
    return orderNum.slice(0, 8); // Ensure max 7 digits after D prefix
}

// =============================================
// Main Dine-in Checkout Logic
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
        const orderNumber = generateOrderNumber(); // Generate formatted order number
        
        // Create complete order data for history
        const completeOrderData = {
            id: orderNumber,
            orderType: "Dine-In",
            items: orderList.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity || 1
            })),
            total: totalPrice,
            paymentMethod: automaticPaymentMethod,
            timestamp: new Date().toISOString()
        };

        // Save to order history
        if (saveOrder(completeOrderData)) {
            // Store all receipt data in a single object
            localStorage.setItem("receiptData", JSON.stringify({
                orderNumber: orderNumber,
                orderType: "Dine-In",
                items: orderList,
                total: totalPrice,
                paymentMethod: automaticPaymentMethod,
                timestamp: completeOrderData.timestamp
            }));

            alert(`Dine-In order confirmed!\nTotal: ₱${totalPrice.toFixed(2)}`);

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
            window.location.href = "dine.html"; // Return to Dine-In menu
        }, 500);
    });
});