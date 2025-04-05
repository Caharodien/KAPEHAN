document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('click', function() {
            // Get current position and dimensions
            const rect = logo.getBoundingClientRect();
            const startX = rect.left;
            const startY = rect.top;
            const startWidth = rect.width;
            const startHeight = rect.height;
            
            // Calculate final position (top center of viewport)
            const finalX = (window.innerWidth / 2) - (startWidth / 4);
            const finalY = 20; // 20px from top
            
            // Apply animation styles
            logo.style.position = 'fixed';
            logo.style.left = startX + 'px';
            logo.style.top = startY + 'px';
            logo.style.transition = 'all 0.5s ease-in-out';
            logo.style.zIndex = '1000';
            
            // Trigger the animation
            setTimeout(() => {
                logo.style.width = (startWidth / 2) + 'px';
                logo.style.height = (startHeight / 2) + 'px';
                logo.style.left = finalX + 'px';
                logo.style.top = finalY + 'px';
            }, 10);
            
            // Navigate after animation completes
            setTimeout(() => {
                window.location.href = 'd&t.html';
            }, 600);
        });
    }
});