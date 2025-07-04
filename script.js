const checkbox = document.getElementById('enableCheckbox');
const button = document.getElementById('actionButton');

checkbox.addEventListener('change', function () {
    button.disabled = !checkbox.checked;
    button.classList.toggle("enabled", checkbox.checked);
});

let suspiciousCount = 0;
document.addEventListener('click', () => checkForSuspiciousActivity());
document.addEventListener('keydown', () => checkForSuspiciousActivity());
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    alert('Right-click is disabled for security reasons!');
    checkForSuspiciousActivity();
});

function checkForSuspiciousActivity() {
    suspiciousCount++;
    if (suspiciousCount > 5) {
        alert('⚠ Multiple suspicious activities detected! You will be redirected.');
        sendSuspiciousActivityEmail();
        const errorCondition = true;
        if (errorCondition) {
            document.getElementById("access-denied").style.display = "flex";
        }
    }
}

function sendSuspiciousActivityEmail() {
    emailjs.send("service_ddoja3f", "template_siy2aej", {
        to_email: "sampathsilaparasetti2004@gmail.com",  
        from_name: "Sampath",
        message: "Multiple suspicious activities have been detected on the website. Please investigate immediately."
    }).then(
        function(response) {
            console.log(" Email sent successfully!", response.status, response.text);
        },
        function(error) {
            console.error(" Failed to send email:", error);
        }
    );
}