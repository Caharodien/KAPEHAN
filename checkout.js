document.addEventListener("DOMContentLoaded", function () {
    const orderListElement = document.getElementById("order-list");
    const totalPriceElement = document.getElementById("total-price");
    const confirmPaymentButton = document.getElementById("confirm-payment");
    const addMoreButton = document.getElementById("add-more");
    const body = document.body;

    // Retrieve order data from localStorage
    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const totalPrice = localStorage.getItem("totalPrice") || 0;

    // Display order items
    orderList.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₱${item.price}`;
        orderListElement.appendChild(li);
    });

    // Display total price
    totalPriceElement.textContent = `Total: ₱${totalPrice}`;

    // Confirm Payment Button with Pull-Down Exit Animation
    confirmPaymentButton.addEventListener("click", function () {
        const paymentMethod = document.querySelector('input[name="payment"]:checked');
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        alert(`Payment confirmed! Thank you for your order. Total: ₱${totalPrice}`);

        // Store order details in localStorage for receipt.html
        localStorage.setItem("receiptOrderList", JSON.stringify(orderList));
        localStorage.setItem("receiptTotalPrice", totalPrice);

        // Apply pull-down exit animation before redirecting
        body.classList.add("pull-down-exit");

        setTimeout(() => {
            localStorage.removeItem("orderList"); // Clear order list from checkout storage
            localStorage.removeItem("totalPrice");

            window.location.href = "receipt.html"; // Redirect to receipt page
        }, 500); // Match animation duration
    });

    // Add More Button
    addMoreButton.addEventListener("click", function () {
        // Animation before going back to menu.html
        body.classList.add("pull-down-exit");

        setTimeout(() => {
            window.location.href = "dine.html"; // Redirect to menu page
        }, 500);
        
        setTimeout(() => {
            window.location.href = "takeout.html"; // Redirect to menu page
        }, 500);// Match animation duration
    });
});
