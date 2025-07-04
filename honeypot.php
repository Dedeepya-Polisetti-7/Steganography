
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fake Login</title>
</head>
<body>
    <h2>Login</h2>
    <form action="<?php $_PHP_SELF ?>" method="GET">
        <input type="text" name="username" placeholder="Username" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
    </form>
</body>
</html>

<?php
// Log attacker details
//$log_file = 'honeypot_log.txt';
$ip = $_SERVER['REMOTE_ADDR'];
$username = $_GET['username'];
$password = $_GET['password'];
$timestamp = date("Y-m-d H:i:s");

// Save details to log file
$log_entry = "IP: $ip | Username: $username | Password: $password | Time: $timestamp\n";
//file_put_contents($log_file, $log_entry, FILE_APPEND);
echo "hello".$log_entry."<br/>";

// Redirect attacker to a fake error page
//header("Location: error_page.html");
exit();
?>
