document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const hotTab = document.getElementById("hot-tab");
    const coldTab = document.getElementById("cold-tab");
    const hotMenu = document.getElementById("hot-menu");
    const coldMenu = document.getElementById("cold-menu");
    const startAgain = document.getElementById("start-again");
    const confirmModal = document.getElementById("confirm-modal");
    const confirmYes = document.getElementById("confirm-yes");
    const confirmNo = document.getElementById("confirm-no");
    const totalPriceElement = document.getElementById("total-price");
    const orderItemsElement = document.getElementById("order-items");
    const proceedCheckout = document.getElementById("proceed-checkout");

    let totalPrice = 0;
    let orderList = [];

    // Ensure only HOT menu is visible at the start
    hotMenu.style.display = "grid";
    coldMenu.style.display = "none";

    // HOT button click
    hotTab.addEventListener("click", function () {
        hotMenu.style.display = "grid";
        coldMenu.style.display = "none";
        hotTab.classList.add("active");
        coldTab.classList.remove("active");
    });

    // COLD button click
    coldTab.addEventListener("click", function () {
        coldMenu.style.display = "grid";
        hotMenu.style.display = "none";
        coldTab.classList.add("active");
        hotTab.classList.remove("active");
    });

    // Start Again Button - Show Confirmation Modal
    startAgain.addEventListener("click", function () {
        confirmModal.style.display = "block";
    });

    // If Yes is clicked - Redirect to D&T.html
    confirmYes.addEventListener("click", function () {
        localStorage.clear(); // Clear the order
        window.location.href = "D&T.html";
    });

    // If No is clicked - Close Modal
    confirmNo.addEventListener("click", function () {
        confirmModal.style.display = "none";
    });

    // Add event listeners to all menu items
    document.querySelectorAll(".item").forEach(item => {
        item.addEventListener("click", function () {
            const itemName = this.querySelector("p").innerText;
            const itemPrice = 39; // Assuming each item costs ₱39
            addToOrder(itemName, itemPrice);
        });
    });

    // Add item to order list
    function addToOrder(name, price) {
        totalPrice += price;
        orderList.push({ name, price });

        updateOrderList();
    }

    // Remove item from order list
    function removeFromOrder(index) {
        totalPrice -= orderList[index].price; // Subtract price
        orderList.splice(index, 1); // Remove item from array

        updateOrderList();
    }

    // Update order list display
    function updateOrderList() {
        // Update total price
        totalPriceElement.textContent = totalPrice;

        // Update order list UI
        orderItemsElement.innerHTML = "";
        orderList.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - ₱${item.price} <button class="remove-btn" data-index="${index}">❌</button>`;
            orderItemsElement.appendChild(li);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                removeFromOrder(this.getAttribute("data-index"));
            });
        });

        // Save order in localStorage
        localStorage.setItem("orderList", JSON.stringify(orderList));
        localStorage.setItem("totalPrice", totalPrice);
    }

    // Proceed to checkout
    proceedCheckout.addEventListener("click", function () {
        if (orderList.length === 0) {
            alert("Your order is empty. Please add items to proceed.");
            return;
        }
        window.location.href = "checkout.html";
    });

    // Load order from localStorage on page load
    function loadOrder() {
        const savedOrderList = JSON.parse(localStorage.getItem("orderList")) || [];
        const savedTotalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

        orderList = savedOrderList;
        totalPrice = savedTotalPrice;

        updateOrderList();
    }

    // Load order when the page loads
    loadOrder();
});