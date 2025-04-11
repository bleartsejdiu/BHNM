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

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function () {
            const name = card.getAttribute('data-name');
            const price = card.getAttribute('data-price');
            const image = card.getAttribute('data-image');
            const description = card.getAttribute('data-description');

            document.getElementById('modalName').innerText = name;
            document.getElementById('modalPrice').innerText = price;
            document.getElementById('modalImage').src = image;
            document.getElementById('modalDescription').innerText = description;

            $('#productModal').modal('show');
        });
    });
});

function addToCart() {
    window.location.href = 'index.html';
}

function performSearch() {
    var query = $('#searchInput').val();
    if (query !== "") {
        window.location.href = '/search?q=' + encodeURIComponent(query);
    }
}

$(document).ready(function() {
    function toggleSearch() {
        $('#searchOverlay').toggleClass('hidden');
    }

    $('.search-icon').on('click', toggleSearch);

    $('#searchInput').keypress(function(e) {
        if (e.which === 13) {
            performSearch();
        }
    });
});
