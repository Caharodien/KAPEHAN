document.addEventListener("DOMContentLoaded", function() {
    // DOM Elements
    const elements = {
        orderList: document.getElementById("order-list"),
        totalPrice: document.getElementById("total-price"),
        subtotalPrice: document.getElementById("subtotal-price"),
        orderId: document.getElementById("order-id"),
        orderDate: document.getElementById("order-date"),
        orderTime: document.getElementById("order-time"),
        paymentMethod: document.getElementById("payment-method"),
        orderType: document.getElementById("order-type"),
        priorityNumber: document.getElementById("priority-number"),
        newOrderBtn: document.getElementById("new-order"),
        printReceiptBtn: document.getElementById("print-receipt"),
        receiptContainer: document.querySelector(".receipt-container")
    };

    // Try to get order data from multiple possible sources
    const getOrderData = () => {
        // First try receiptData (new system)
        let data = JSON.parse(localStorage.getItem("receiptData"));
        
        // Fallback to individual items (legacy system)
        if (!data) {
            data = {
                orderNumber: localStorage.getItem("receiptOrderId") || "N/A",
                orderType: localStorage.getItem("orderType") || "Dine-in",
                items: JSON.parse(localStorage.getItem("receiptOrderList") || "[]"),
                total: parseFloat(localStorage.getItem("receiptTotalPrice") || 0),
                paymentMethod: localStorage.getItem("receiptPaymentMethod") || "Cash",
                timestamp: localStorage.getItem("receiptOrderTime") || new Date().toISOString(),
                priorityNumber: "N/A" // Default if not available
            };
        }
        
        return data;
    };

    const orderData = getOrderData();

    // Validate we have basic order data
    if (!orderData.items || orderData.items.length === 0) {
        alert("No order data found. Please place an order first.");
        window.location.href = "index.html";
        return;
    }

    // Set order type class for styling
    const orderType = orderData.orderType || "Dine-in";
    document.body.classList.add(orderType.toLowerCase() + "-receipt");

    // Formatting functions
    const formatOrderId = (id) => {
        if (!id || id === "N/A") return "N/A";
        if (id.length <= 8) return id;
        return `${id.substring(0, 4)}...${id.slice(-4)}`;
    };

    const formatTime = (date) => {
        try {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch {
            return "N/A";
        }
    };

    const formatDate = (date) => {
        try {
            return date.toLocaleDateString('en-PH', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return "N/A";
        }
    };

    // Process order date/time
    let orderDate;
    try {
        orderDate = new Date(orderData.timestamp);
    } catch {
        orderDate = new Date();
    }

    // Display order information
    elements.orderId.textContent = formatOrderId(orderData.orderNumber);
    elements.orderDate.textContent = formatDate(orderDate);
    elements.orderTime.textContent = formatTime(orderDate);
    elements.paymentMethod.textContent = orderData.paymentMethod;
    elements.orderType.textContent = orderType === "Takeout" ? "Takeout" : "Dine-in";
    elements.priorityNumber.textContent = orderData.priorityNumber || "N/A";

    // Calculate and display prices
    const subtotal = orderData.items.reduce((sum, item) => {
        return sum + (item.price * (item.quantity || 1));
    }, 0);
    
    elements.subtotalPrice.textContent = `₱${subtotal.toFixed(2)}`;
    elements.totalPrice.textContent = `₱${(orderData.total || subtotal).toFixed(2)}`;

    // Display order items
    elements.orderList.innerHTML = ""; // Clear existing
    orderData.items.forEach(item => {
        const li = document.createElement("li");
        const quantity = item.quantity || 1;
        li.innerHTML = `
            <span class="item-name">${quantity}x ${item.name}</span>
            <span class="item-price">₱${(item.price * quantity).toFixed(2)}</span>
        `;
        elements.orderList.appendChild(li);
    });

    // Button functionality
    elements.newOrderBtn.addEventListener("click", () => {
        // Clear temporary order data
        ["receiptData", "receiptOrderList", "receiptTotalPrice", "receiptOrderId", "orderType", "receiptPaymentMethod", "receiptOrderTime"].forEach(key => {
            localStorage.removeItem(key);
        });
        window.location.href = "index.html";
    });

    // Enhanced Print Functionality with auto-print
    const printReceipt = () => {
        // Create print-specific styles
        const printStyles = `
            <style>
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .receipt-container, .receipt-container * {
                        visibility: visible;
                    }
                    .receipt-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        max-width: 100%;
                        padding: 0;
                        margin: 0;
                        box-shadow: none;
                    }
                    .no-print {
                        display: none !important;
                    }
                    @page {
                        size: auto;
                        margin: 0mm;
                    }
                }
            </style>
        `;
        
        // Create a clone of the receipt for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Order Receipt - ${orderData.orderNumber}</title>
                    ${printStyles}
                </head>
                <body>
                    ${elements.receiptContainer.outerHTML}
                    <script>
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 200);
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    // Add print event listener
    if (elements.printReceiptBtn) {
        elements.printReceiptBtn.addEventListener("click", printReceipt);
    }

    // Auto-print the receipt after a short delay
    setTimeout(() => {
        printReceipt();
    }, 500);

    // Auto-redirect after 30 seconds (cancelable)
    const redirectTimer = setTimeout(() => {
        window.location.href = "index.html";
    }, 30000);

    // Cancel redirect if user interacts with the page
    document.addEventListener("click", () => {
        clearTimeout(redirectTimer);
    });
});

function animateReceiptExit(destination) {
    document.body.classList.add('receipt-exit');
    setTimeout(() => {
        window.location.href = destination;
    }, 400); // Matches the 0.4s animation duration
}