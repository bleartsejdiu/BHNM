document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const closeBtn = document.querySelector('.close-btn');

    menuToggle.addEventListener('click', () => {
        sidebarMenu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        sidebarMenu.classList.remove('active');
    });
});

