function aesEncryptMultipleTimes(text, key, times) {
    let encrypted = text;
    for (let i = 0; i < times; i++) {
        encrypted = CryptoJS.AES.encrypt(encrypted, key).toString();
    }
    return encrypted;
}

function generateRandomMessage(length = 8) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:',.<>?";
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }
    return result;
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

document.getElementById('encryptButton').addEventListener('click', () => {
    const fileInput = document.getElementById('imageInput').files[0];
    const encryptionKey = "mysecurekey123";

    if (!fileInput) {
        alert('Please upload an image.');
        return;
    }

    let message = generateRandomMessage();
    let encryptedMessage = aesEncryptMultipleTimes(message, encryptionKey, 4);

    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            for (let i = 0; i < encryptedMessage.length && i * 4 < pixels.length; i++) {
                pixels[i * 4] = encryptedMessage.charCodeAt(i); 
            }
            pixels[encryptedMessage.length * 4] = 0; 

            ctx.putImageData(imageData, 0, 0);

            // Auto download
            const link = document.createElement('a');
            link.href = canvas.toDataURL("image/png");
            link.download = "encrypted-image.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(fileInput);
});