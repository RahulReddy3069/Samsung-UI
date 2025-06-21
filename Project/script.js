const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const cards = document.querySelectorAll('.feature-card, .product-card');
const observerOptions = {
    root: null,
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

cards.forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
});

const cartButtons = document.querySelectorAll('.add-to-cart');
const buyButtons = document.querySelectorAll('.buy-now');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');

function showNotification(message, type) {
    notificationMessage.textContent = message;
    notification.classList.remove('cart', 'buy');
    notification.classList.add(type, 'show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.getAttribute('data-product');
        const price = button.getAttribute('data-price');
        showNotification(`${product} (₹${price}) added to cart!`, 'cart');
    });
});

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.getAttribute('data-product');
        const price = button.getAttribute('data-price');
        showNotification(`Purchased ${product} for ₹${price}!`, 'buy');
    });
});