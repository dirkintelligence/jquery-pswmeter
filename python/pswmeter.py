import re

def pswmeter(password: str, psw_min_length: int = 10) -> int:
    """
    Calculates the security score of a password.
    (c) D.Ruetz, 2024

    Args:
        password (str): The password to be evaluated
        psw_min_length (int, optional): Minimum length of the password. Defaults to 10.

    Returns:
        int: The security score of the password, ranging from 0 to 4.
            0-3: Password is too simple
            4-5: Password is good / great
    """
    score = 0
    
    # Regular Expressions - vereinfachte Version für Python
    regex_lower = r'[a-z]'           # Lowercase letters
    regex_upper = r'[A-Z]'           # Uppercase letters
    regex_digits = r'[0-9]'          # Digits
    regex_special = r'[^a-zA-Z0-9\s]'  # Special characters
    
    if re.search(regex_lower, password): score += 1
    if re.search(regex_upper, password): score += 1
    if re.search(regex_digits, password): score += 1
    if re.search(regex_special, password): score += 1
    
    if len(password) >= psw_min_length:
        score += 1
    else:
        score = min(score, 3)
    
    return score