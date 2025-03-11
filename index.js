document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const logo = document.querySelector(".logo");

    // Add upward pull effect when the page loads
    body.classList.add("pull-up");

    // Page transition effect (pull up before redirecting)
    document.addEventListener("click", function () {
        body.classList.add("pull-up-exit");
        setTimeout(() => {
            window.location.href = "D&t.html";
        }, 500); // Matches animation duration
    });

    // Slight bounce effect on hover for the logo
    logo.addEventListener("mouseover", function () {
        logo.classList.add("bounce-hover");
    });

    logo.addEventListener("mouseout", function () {
        logo.classList.remove("bounce-hover");
    });
});
