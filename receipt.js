document.addEventListener("DOMContentLoaded", function() {
    // DOM Elements
    const orderListElement = document.getElementById("order-list");
    const totalPriceElement = document.getElementById("total-price");
    const subtotalPriceElement = document.getElementById("subtotal-price");
    const orderIdElement = document.getElementById("order-id");
    const orderDateElement = document.getElementById("order-date");
    const orderTimeElement = document.getElementById("order-time");
    const paymentMethodElement = document.getElementById("payment-method");
    const newOrderButton = document.getElementById("new-order");

    // Retrieve order data
    const orderItems = JSON.parse(localStorage.getItem("receiptOrderList")) || [];
    const totalPrice = parseFloat(localStorage.getItem("receiptTotalPrice")) || 0;
    const paymentMethod = localStorage.getItem("receiptPaymentMethod") || "Cash";
    const orderId = localStorage.getItem("receiptOrderId") || "N/A";
    const orderTimestamp = localStorage.getItem("receiptOrderTime") || new Date().toISOString();

    // Format date and time
    const orderDate = new Date(orderTimestamp);
    const formattedDate = orderDate.toLocaleDateString('en-PH', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    const formattedTime = orderDate.toLocaleTimeString('en-PH', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });

    // Display order information
    orderIdElement.textContent = orderId;
    orderDateElement.textContent = formattedDate;
    orderTimeElement.textContent = formattedTime;
    paymentMethodElement.textContent = paymentMethod;

    // Calculate subtotal (assuming no taxes/fees for now)
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    subtotalPriceElement.textContent = `₱${subtotal.toFixed(2)}`;
    totalPriceElement.textContent = `₱${totalPrice.toFixed(2)}`;

    // Display order items
    orderItems.forEach(item => {
        const li = document.createElement("li");
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;
        
        li.innerHTML = `
            <span class="item-name">${quantity}x ${item.name}</span>
            <span class="item-price">₱${itemTotal.toFixed(2)}</span>
        `;
        orderListElement.appendChild(li);
    });

    // New Order button
    newOrderButton.addEventListener("click", function() {
        localStorage.removeItem("orderList");
        localStorage.removeItem("totalPrice");
        window.location.href = "index.html";
    });

    // Auto-redirect after 30 seconds (optional)
    setTimeout(() => {
        window.location.href = "index.html";
    }, 10000);
});
document.addEventListener("DOMContentLoaded", function() {
    // Get the order ID from localStorage
    const orderId = localStorage.getItem("receiptOrderId") || "N/A";
    
    // Format the ID to match your ViewOrderList display
    const formattedId = orderId.length > 10 ? orderId.substring(0, 10) + "..." : orderId;
    
    // Display it in the receipt
    document.getElementById("receipt-order-id").textContent = formattedId;
    
    // Also display the full ID in console for debugging
    console.log("Full Order ID:", orderId);
    
    // Format and display the date/time
    const now = new Date();
    const options = { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    };
    document.getElementById("order-date-time").textContent = 
        now.toLocaleDateString('en-US', options);
});
// Update the time formatting in receipt.js
const formatTimeForReceipt = (date) => {
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}.${minutes} ${ampm}`;
};

// Then use it like this:
document.getElementById("order-date-time").textContent = 
    `${formatTimeForReceipt(new Date())}`;