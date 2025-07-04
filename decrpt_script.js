function aesDecryptMultipleTimes(encryptedText, key, times) {
    let decrypted = encryptedText;
    for (let i = 0; i < times; i++) {
        let bytes = CryptoJS.AES.decrypt(decrypted, key);
        decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) return "Decryption failed";
    }
    return decrypted;
}

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let hiddenMessage = "";
const encryptionKey = "mysecurekey123";

document.getElementById('decryptButton').addEventListener('click', () => {
    const fileInput = document.getElementById('decryptImageInput').files[0];
    if (!fileInput) {
        alert('Please upload an encrypted image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            hiddenMessage = '';
            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i] === 0) break;
                hiddenMessage += String.fromCharCode(pixels[i]);
            }

            if (hiddenMessage) {
                let decryptedMessage = aesDecryptMultipleTimes(hiddenMessage, encryptionKey, 4);
                //document.getElementById('result').textContent = decryptedMessage;
                document.getElementById('passwordSection').style.display = 'block';
                let maskedMessage = "•".repeat(decryptedMessage.length);
                document.getElementById('passwordInput').value = maskedMessage;
                document.getElementById('passwordInput').dataset.actualPassword = decryptedMessage;
                document.getElementById('verifyButton').disabled = decryptedMessage.length !== 8;
            } else {
                document.getElementById('result').textContent = "No hidden message found.";
                document.getElementById('passwordSection').style.display = 'none';
            }
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(fileInput);
});

document.getElementById('verifyButton').addEventListener('click', () => {
    if (document.getElementById('passwordInput').dataset.actualPassword.length === 8) {
        window.location.href = "http://127.0.0.1:5500/amazon.html";
    }
});