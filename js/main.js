document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const closeBtn = document.querySelector('.close-btn');
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');

    menuToggle.addEventListener('click', () => {
        sidebarMenu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        sidebarMenu.classList.remove('active');
    });

    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.toggle('visible');
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

function performSearch() {
    var query = $('#searchInput').val();
    if (query !== "") {
        window.location.href = '/search?q=' + encodeURIComponent(query);
    }
}

function addToCart() {
    const name = document.getElementById("modalName").innerText;
    const priceText = document.getElementById("modalPrice").innerText;
    const image = document.getElementById("modalImage").src;
    const description = document.getElementById("modalDescription").innerText;

    const price = parseFloat(priceText.replace("€", "").trim());

    const cartItems = document.getElementById("cartItems");
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
        <img src="${image}" alt="${name}">
        <div class="cart-item-info">
            <p><strong>${name}</strong></p>
            <p>${description}</p>
            <p class="price">${priceText}</p>
        </div>
    `;

    cartItems.appendChild(cartItem);

    const cartCount = document.getElementById("cartCount");
    let count = parseInt(cartCount.innerText);
    cartCount.innerText = count + 1;

    const currentTotal = parseFloat(document.getElementById("cartTotal").innerText.replace("€", "").trim()) || 0;
    const newTotal = currentTotal + price;
    document.getElementById("cartTotal").innerText = `${newTotal.toFixed(2)}€`;

    const checkoutBtn = document.getElementById("checkoutBtn");
    checkoutBtn.style.display = "block";

    cartSidebar.classList.add('visible');

    $('#productModal').modal('hide');

    console.log('Item added to cart:', { name, price, image, description });
    console.log('Current cart total:', newTotal);
}

function checkout() {
    $('#paymentSuccessModal').modal('show');

    // Clear the cart
    document.getElementById("cartItems").innerHTML = "";
    document.getElementById("cartTotal").innerText = "0.00€";
    document.getElementById("checkoutBtn").style.display = "none";
    document.getElementById("cartCount").innerText = "0";

    cartSidebar.classList.remove('visible');

    console.log('Checkout completed');
}
