#!/usr/bin/env python3
from pswmeter import pswmeter

if __name__ == "__main__":
    # Test cases
    test_passwords = [
        "",             # Should score 0
        "password",     # Should score 1
        "Password1",    # Should score 3
        "Password1!",   # Should score 4 or 5 depending on length
        "StrongP@ssw0rd"  # Should score 5
    ]
    
    for pwd in test_passwords:
        score = pswmeter(pwd)
        print(f"Password: {pwd:<15} Score: {score}")