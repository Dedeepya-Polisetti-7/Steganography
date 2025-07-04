const products = [
    
    { name: "Smartphone", price: 699, image: "img/smartphone.jpg" },
    { name: "Headphones", price: 129, image: "img/headphone.jpg" },
    { name: "Smartwatch", price: 199, image: "img/smart watch.jpg"},
    { name: "Camera", price: 499, image:"img/cam.jpg"},
    { name: "Gaming Console", price: 399, image: "img/gaming console.jpg" },
    { name: "Bluetooth Speaker", price: 79, image: "img/bluetooth speaker.jpg"},
    { name: "Tablet", price: 349, image: "img/tab.jpg" },
    { name: "Monitor", price: 249, image: "img/monitor.jpg"},
    { name: "Keyboard", price: 49, image: "img/key board.jpg"},
    { name: "Mouse", price: 29, image: "img/mouse.jpg" },
    { name: "External Hard Drive", price: 99, image: "img/x drive.jpg" },
    { name: "USB Flash Drive", price: 19, image: "img/usb.jpg" },
    { name: "Wireless Earbuds", price: 159, image: "img/ear buds.jpg" },
    { name: "Webcam", price: 89, image: "img/webcam.jpg" },
    { name: "Tripod", price: 59, image: "img/tripod.jpg" },
    { name: "VR Headset", price: 299, image: "img/head set.jpg" },
    { name: "Smart TV", price: 799, image: "img/tv.jpg"},
    { name: "Power Bank", price: 39, image: "img/power bank.jpg" },
    { name: "Router", price: 119, image: "img/router.webp" },
    { name: "Laptop", price: 45999, image: "img/laptop.jpg" },
    

];

let cart = {};

function addToCart(index) {
    const quantity = parseInt(document.getElementById(`quantity-${index}`).value) || 1;
    if (cart[products[index].name]) {
        cart[products[index].name].quantity += quantity;
    } else {
        cart[products[index].name] = { ...products[index], quantity };
    }
    updateCartCount();
}

function updateCartCount() {
    let totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").innerText = totalItems;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function viewCart() {
    window.location.href = "secondPage.html";
}

function loadProducts() {
    const container = document.getElementById("products");
    products.forEach((product, index) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <input type="number" id="quantity-${index}" value="1" min="1">
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        container.appendChild(productElement);
    });
}

loadProducts();