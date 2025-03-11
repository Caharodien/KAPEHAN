document.addEventListener("DOMContentLoaded", function () {
    const orderListElement = document.getElementById("order-list");
    const totalPriceElement = document.getElementById("total-price");
    const confirmPaymentButton = document.getElementById("confirm-payment");

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

    // Confirm Payment Button
    confirmPaymentButton.addEventListener("click", function () {
        const paymentMethod = document.querySelector('input[name="payment"]:checked');
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        alert(`Payment confirmed! Thank you for your order. Total: ₱${totalPrice}`);
        localStorage.clear(); // Clear the order after payment
        window.location.href = "index.html"; // Redirect to the start page
    });
});