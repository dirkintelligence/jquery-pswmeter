<?php
require __DIR__ . '/pswmeter.php';

header("Content-Type: text/plain");

$test_passwords = [
    "",             # Should score 0
    "password",     # Should score 1
    "Password1",    # Should score 3
    "Password1!",   # Should score 4 or 5 depending on length
    "StrongP@ssw0rd"  # Should score 5
];
    
foreach ($test_passwords as $pwd) {
    $score = pswmeter($pwd);
    printf("Password: %-15s Score: %s\n", $pwd, $score);
}

?>