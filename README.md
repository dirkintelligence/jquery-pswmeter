# jquery-pswmeter.js

You want to give feedback to a website visitor while they are typing in a new password? passwordmeter shows which criteria are met and checks whether there are enough criteria for a (reasonably) secure password. It is a compromise solution between security and simplicity.

## How it works

passwordmeter displays a dialog box below the password input field and shows which of the criteria are met by means of a cross or tick.
The password length (configurable) must be met, as well as x of 4 other criteria (configurable: 2 to 4 of 4).

## JavaScript Integration

### Include scripts

In the HTML header:

	<link href=.../jquery-pswmeter.min.css" rel="stylesheet">

At the end of the HTML code:

	<script src=“.../jquery-pswmeter.min.min.js”></script>

### HTML

Add the class name “pswmeter” to your password input element.

	<input type=“password” name=“mypassword” class=“pswmeter” value=“”>

### JavaScript
	
**Initialize**

    document.addEventListener("DOMContentLoaded", function() {
        passwordmeter({});
    });

**Options**

	document.addEventListener("DOMContentLoaded", function() {
	    var pswmeter = passwordmeter({
	        minimum_length: 10,
	        extra_criteria: 3,
	        messages: {
	            msg_length: 'Minimum length: ## characters',
	            msg_label: 'Meet at least ## of 4 criteria:',
	            msg_lowercase: 'at least one lowercase letter',
	            msg_uppercase: 'at least one capital letter',
	            msg_numbers: 'at least one digit',
	            msg_special: 'at least one special character',
	        },
	        icons: {
	            icon_checkmark : '✓',
	            icon_cross: '✗'
	        },
	        callback: function() {}
	    });
	});

The default options are listed here and can be customized. You can omit all options that should not be changed.
HTML code is allowed within the strings.
The hashes ## are replaced by the corresponding number.

**Evaluate feedback**

The passwordmeter() generates a strength value ("score") of the password - more precisely: the number of criteria met, including the minimum length.
If the score is *1 + extra_criteria*, then the password fulfills the requirements.
In the following example, the score is displayed live in the browser console:

	document.addEventListener("DOMContentLoaded", function() {
	    var pswmeter = passwordmeter({
	        extra_criteria : 3,
	        callback: function() {
	            console.log('score: ' + pswmeter.score);
	        }
	    });
	});

**Usual approach**

Check the score when submitting the form. Prevent the form from being sent if the necessary criteria are not met.
After submitting, you can also check the requirements with a backend scripting language (e.g. PHP or Python), as the check with JavaScript is of course not secure, but purely intended for visual feedback.

	<form onsubmit="if (pswmeter.score < 4) { alert('password is not secure!'); return false; }">
	...
	</form>
            
## Double Check with PHP

see php folder

## Double Check with Python

see phyton folder
