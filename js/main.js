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
    const query = $('#searchInput').val().toLowerCase().trim();

    if (query === "") return;

    let found = false;

    document.querySelectorAll('.product-card').forEach(card => {
        const name = card.getAttribute('data-name')?.toLowerCase() || "";
        const description = card.getAttribute('data-description')?.toLowerCase() || "";
        const price = card.getAttribute('data-price')?.toLowerCase() || "";

        if (name.includes(query) || description.includes(query) || price.includes(query)) {
            card.click();
            found = true;
            return false;
        }
    });

    if (!found) {
        alert("Product not found.");
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

    document.querySelector('.cart-sidebar').classList.add('visible');

    $('#productModal').modal('hide');

    console.log('Item added to cart:', { name, price, image, description });
    console.log('Current cart total:', newTotal);
}

function checkout() {
    $('#checkoutModal').modal('show');
}

document.getElementById('checkoutBtn').onclick = function() {
    checkout();
};

$('#paymentForm').submit(function(event) {
    event.preventDefault();

    let cardName = $('#cardName').val();
    let cardNumber = $('#cardNumber').val().replace(/\s/g, '');
    let expiryDate = $('#expiryDate').val();
    let cvv = $('#cvv').val();

    if (!/^\d{16}$/.test(cardNumber)) {
        alert("The card number must have 16 digits.");
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        return;
    }

    // Clear the cart
    clearCart();

    $('#paymentSuccessModal').modal('show');
    $('#checkoutModal').modal('hide');

    console.log("Payment has been made successfully!");
});

function clearCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = '';

    const cartCount = document.getElementById("cartCount");
    cartCount.innerText = '0';

    const cartTotal = document.getElementById("cartTotal");
    cartTotal.innerText = '0.00€';

    const checkoutBtn = document.getElementById("checkoutBtn");
    checkoutBtn.style.display = "none";

    document.querySelector('.cart-sidebar').classList.remove('visible');
}

$('#cardNumber').on('input', function() {
    let value = $(this).val().replace(/\D/g, '');
    if (value.length > 16) {
        value = value.slice(0, 16);
    }
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    $(this).val(value);
});

$('#expiryDate').on('input', function() {
    let value = $(this).val().replace(/\D/g, '');
    if (value.length > 4) {
        value = value.slice(0, 4);
    }
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    $(this).val(value);
});

$('#cvv').on('input', function() {
    let value = $(this).val().replace(/\D/g, '');
    if (value.length > 3) {
        value = value.slice(0, 3);
    }
    $(this).val(value);
});
