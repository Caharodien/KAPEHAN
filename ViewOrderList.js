document.addEventListener('DOMContentLoaded', function() {
    displayOrders();
});

function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('coffeeShopOrders') || '[]');
    const tableBody = document.getElementById('ordersTableBody');
    
    tableBody.innerHTML = ''; // Clear existing rows
    
    if (orders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7">No orders found</td></tr>';
        return;
    }
    
    // Sort orders by timestamp (newest first)
    orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Create a map to track unique orders by their ID
    const uniqueOrders = new Map();
    
    orders.forEach(order => {
        // Skip if we've already processed this order ID
        if (uniqueOrders.has(order.id || order.orderNumber)) {
            return;
        }
        
        // Mark this order ID as processed
        uniqueOrders.set(order.id || order.orderNumber, true);
        
        const row = document.createElement('tr');
        
        // Add class based on order type for styling
        row.classList.add(order.orderType.toLowerCase() === 'takeout' ? 'takeout-order' : 'dinein-order');
        
        // Process items to combine duplicates
        const itemCounts = {};
        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                const key = item.name;
                itemCounts[key] = (itemCounts[key] || 0) + (item.quantity || 1);
            });
        }
        
        // Format items list with combined quantities
        const itemsList = Object.keys(itemCounts).length > 0
            ? Object.entries(itemCounts).map(([name, quantity]) => `${name} (${quantity})`).join(', ')
            : 'No items';
        
        // Format date and time
        let dateString = 'N/A';
        let timeString = 'N/A';
        try {
            const orderTime = new Date(order.timestamp);
            dateString = orderTime.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            timeString = orderTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
            });
        } catch (e) {
            console.error('Error formatting date/time:', e);
        }
        
        // Create type indicator with icon
        const typeIndicator = order.orderType.toLowerCase() === 'takeout' 
            ? '🛍️ Takeout' 
            : '🍽️ Dine-in';
        
        row.innerHTML = `
            <td>${order.priorityNumber || 'N/A'}</td>
            <td>${order.id || order.orderNumber || 'N/A'}</td>
            <td class="order-type-cell">${typeIndicator}</td>
            <td>${itemsList}</td>
            <td>₱${order.total ? order.total.toFixed(2) : '0.00'}</td>
            <td>${dateString}</td>
            <td>${timeString}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Update the order list when new data is added from other pages
window.addEventListener('storage', function(event) {
    if (event.key === 'coffeeShopOrders') {
        displayOrders();
    }
});