// Navbar Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.navLinks');
    const menuIcon = document.querySelector('.menu-icon');
    navLinks.classList.toggle('active');
    menuIcon.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
}

// Video Background
const videoElement = document.getElementById('bgVideo');
const videoSources = ['video1.mp4', 'video2.mp4', 'video3.mp4'];
let currentVideoIndex = 0;

function playNextVideo() {
    videoElement.src = videoSources[currentVideoIndex];
    videoElement.load();
    videoElement.play().catch(() => console.log('Video playback failed'));
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    setTimeout(playNextVideo, 10000);
}
playNextVideo();

// Menu Section
function showCategory(category) {
    document.querySelectorAll('.card-container').forEach(c => c.style.display = 'none');
    document.getElementById(category).style.display = 'flex';
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, price) {
    cart.push({ product, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product} added to cart!`);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} - KES ${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = total;
}

function showCart() {
    document.getElementById('cartModal').style.display = 'flex';
    updateCart();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function orderCartViaWhatsApp() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const phoneNumber = '254112585214';
    const items = cart.map(item => `${item.product} (KES ${item.price})`).join(', ');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const message = `Order from Tips Caffe:\n${items}\nTotal: KES ${total}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    closeCart();
}

// Search Functionality with Debouncing
let searchTimeout;
document.getElementById('searchInput').addEventListener('keyup', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const input = this.value.toLowerCase();
        document.querySelectorAll('.card-container').forEach(container => {
            container.querySelectorAll('.card').forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = name.includes(input) ? 'block' : 'none';
            });
        });
    }, 300);
});

// Loyalty System
const correctCode = generateDailyCode();
const today = new Date().toDateString();
let stamps = parseInt(localStorage.getItem('stamps') || '0');
let lastLogged = localStorage.getItem('lastMealDate');

function generateDailyCode() {
    const date = new Date();
    const seed = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    return 'MEAL' + Math.abs(hash % 1000);
}

function showCodeEntry() {
    if (lastLogged === today) {
        alert("You've already logged today's meal.");
        return;
    }
    document.getElementById('codeEntry').style.display = 'flex';
}

function verifyCode() {
    const enteredCode = document.getElementById('dailyCode').value.trim().toUpperCase();
    const rewardMessage = document.getElementById('rewardMessage');
    if (enteredCode === correctCode) {
        stamps++;
        localStorage.setItem('stamps', stamps);
        localStorage.setItem('lastMealDate', today);
        updateStamps(stamps);
        document.getElementById('codeEntry').style.display = 'none';
        document.getElementById('dailyCode').value = '';
        if (stamps >= 7) {
            rewardMessage.textContent = "🎉 Congratulations! You've unlocked a FREE meal – show this at the counter and celebrate!";
            rewardMessage.style.color = 'green';
            setTimeout(() => {
                stamps = 0;
                localStorage.setItem('stamps', '0');
                updateStamps(0);
                rewardMessage.textContent = '';
            }, 5000);
        }
    } else {
        rewardMessage.textContent = 'Oops! That code doesn\'t match. Try again to claim your stamp!';
        rewardMessage.style.color = 'red';
    }
}

function updateStamps(count) {
    for (let i = 1; i <= 7; i++) {
        const stamp = document.getElementById(`stamp${i}`);
        stamp.classList.toggle('filled', i <= count);
    }
    const progress = document.getElementById('progress');
    progress.style.width = `${(count / 7) * 100}%`;
}
updateStamps(stamps);

// Testimonials Carousel
let testimonialIndex = 0;
function showTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach((card, index) => {
        card.style.display = index === testimonialIndex ? 'block' : 'none';
    });
}
function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % document.querySelectorAll('.testimonial-card').length;
    showTestimonials();
}
function prevTestimonial() {
    testimonialIndex = (testimonialIndex - 1 + document.querySelectorAll('.testimonial-card').length) % document.querySelectorAll('.testimonial-card').length;
    showTestimonials();
}
showTestimonials();

// Did You Know Section
const facts = [
    "Kales are packed with vitamins A, C, and K, boosting your immune system!",
    "Eating balanced meals improves cognitive function, perfect for MMUST students.",
    "Our ingredients are sourced locally to support Kenyan farmers."
];
let factIndex = 0;

function showRandomFact() {
    document.getElementById('factText').style.opacity = 0;
    setTimeout(() => {
        factIndex = Math.floor(Math.random() * facts.length);
        document.getElementById('factText').textContent = facts[factIndex];
        document.getElementById('factText').style.opacity = 1;
    }, 600);
}

function showPreviousFact() {
    document.getElementById('factText').style.opacity = 0;
    setTimeout(() => {
        factIndex = (factIndex - 1 + facts.length) % facts.length;
        document.getElementById('factText').textContent = facts[factIndex];
        document.getElementById('factText').style.opacity = 1;
    }, 600);
}

function shareOnWhatsApp() {
    const fact = document.getElementById('factText').textContent;
    const phoneNumber = '254112585214';
    const message = `Check out this fact from Tips Caffe: ${fact}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

showRandomFact();

// Contact Form Validation
function sendToWhatsApp(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email.');
        return;
    }
    const phoneNumber = '254112585214';
    const text = `Hello, my name is ${name} (${email}).\n\n${message}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    document.getElementById('contactForm').reset();
}

function orderViaWhatsApp(product, price) {
    const phoneNumber = '254112585214';
    const message = `Hello, I'd like to order ${product} for KES ${price}.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
