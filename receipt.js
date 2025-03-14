document.addEventListener("DOMContentLoaded", function () {
    const orderListElement = document.getElementById("order-list");
    const totalPriceElement = document.getElementById("total-price");

    // Retrieve order data from localStorage (from checkout)
    const orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    const totalPrice = localStorage.getItem("totalPrice") || 0;

    // Display order items on receipt
    orderList.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₱${item.price}`;
        orderListElement.appendChild(li);
    });

    // Display total price
    totalPriceElement.textContent = `Total: ₱${totalPrice}`;

    // Auto redirect to index.html after 10 seconds
    setTimeout(() => {
        localStorage.clear(); // Clear order data after showing receipt
        window.location.href = "index.html"; // Redirect back to home
    }, 5000); // 5 seconds
});
