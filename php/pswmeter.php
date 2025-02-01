<?php
/**
 * Calculates the security score of a password.
 * (c) D.Ruetz, 2024
 *
 * @param string $password The password to be evaluated
 * @param int $pswMinLength Minimum length of the password (default: 10)
 * 
 * @return int The security score of the password, ranging from 0 to 4.
 *     0-3: Password is too simple
 *     4-5: Password is good / great
 */
function pswmeter($password, $pswMinLength = 10) {
    /*
        scores
        0: type in password
        1: too simple
        2: too simple
        3: simple
        4: ok
        5: great
    */
    $score = 0;
    
    // Regular Expressions
    $regexLower = '/(?=[\p{Ll}])/u'; // Kleinbuchstaben einschließlich Unicode
    $regexUpper = '/(?=[\p{Lu}])/u'; // Großbuchstaben einschließlich Unicode
    $regexDigits = '/(?=[0-9])/';    // Ziffern
    $regexSpecial = '/(?=[^\p{L}\p{N}\s])/u';  // Sonderzeichen

    // Check conditions
    if (preg_match($regexLower, $password)) { ++$score; }
    if (preg_match($regexUpper, $password)) { ++$score; }
    if (preg_match($regexDigits, $password)) { ++$score; }
    if (preg_match($regexSpecial, $password)) { ++$score; }

    // Minium length is mandatory
    if (mb_strlen($password, 'utf-8') >= $pswMinLength) {
        ++$score;
    }
    else {
        $score = min($score, 3);
    }

    return $score;
}
?>