/*
 * passwordmeter.js V.0.0.1 by D.Ruetz
 * check display password strength
 */
function passwordmeter(opts) {

    var defaults = {
        minimum_length: 10,
		extra_criteria: 3,
        label_length: 'Minimum length: ## characters',
        label_separator: 'Meet at least ## extra criteria:',
        label_lowercase: 'at least one lowercase letter',
        label_uppercase: 'at least one capital letter',
        label_numbers: 'at least one digit',
        label_special: 'at least one special character',
        icon_checkmark : '✓',
        icon_cross: '✗'
    };

    var score = [];

    // container elements - handle multiple instances
    $('.pswmeter').each(function(index, element) {
        var $container = $(element);
        score.push(0);

        var vals = defaults;
        for (var key in opts) {
            vals[key] = opts[key];
        }
        vals.label_length = vals.label_length.replace("##", vals.minimum_length);
        vals.label_separator = vals.label_separator.replace("##", vals.extra_criteria);

        // private
        var scoreLast = 0;

        // password input field
        var $pwinput = $container.find('input[type="password"]');
        if (!$pwinput.length) {
            console.error('Password input not found within .pswmeter container.');
            return;
        }

        // create DOM elements for this instance
        var $scoreBar = $('<div class="pswmeter-score" aria-hidden="true"></div>').appendTo($container);
        var $strengthLayer = $('<div class="pswmeter-layer" aria-hidden="true"></div>').appendTo($container);

        // unicode regex patterns with fallback
        var regs = {
            regexLower : /(?=[a-zäöüß])/i,
            regexUpper : /(?=[A-ZÄÖÜ])/,
            regexNumber : /(?=\d)/,
            regexSpecial : /(?=[^a-zA-ZäöüßÄÖÜ0-9\s])/
        }
        try {
            regs.regexLower = /(?=\p{Ll})/u;
            regs.regexUpper = /(?=\p{Lu})/u;
            regs.regexNumber = /(?=\p{Nd})/u;
            regs.regexSpecial = /(?=[^\p{L}\p{N}\s])/u;
        } catch (e) {
            console.warn("Unicode regex support is not available in this browser. Falling back to basic patterns.");
        }

        // events for this instance
        $pwinput.on("focus input", () => {
            $strengthLayer.show();
            checkPassword();
        }).on("blur", () => $strengthLayer.hide());

        function checkPassword() {
            var pw = $pwinput.val();
            var criteria = {
                length : pw.length >= vals.minimum_length,
                lowercase : regs.regexLower.test(pw),
                uppercase : regs.regexUpper.test(pw),
                numbers : regs.regexNumber.test(pw),
                special : regs.regexSpecial.test(pw)
            }
            updateDisplay(criteria);
        }

        function updateScore(s) {
            $scoreBar.attr("class", "pswmeter-score");
            if (s === 1) $scoreBar.addClass("psms-20");
            else if (s === 2) $scoreBar.addClass("psms-40");
            else if (s === 3) $scoreBar.addClass("psms-60");
            else if (s === 4) $scoreBar.addClass("psms-80");
            else if (s > 4) $scoreBar.addClass("psms-100");

            // update status
            if (s != scoreLast && opts.callback && typeof opts.callback === 'function') {
                opts.callback(s);
                scoreLast = s;
                score[index] = s;
            }
        }

        function updateDisplay(criteria) {
            var content = criteriaElement(vals.label_length, criteria.length);
            content += separatorElement(vals.label_separator);
            content += criteriaElement(vals.label_lowercase, criteria.lowercase);
            content += criteriaElement(vals.label_uppercase, criteria.uppercase);
            content += criteriaElement(vals.label_numbers, criteria.numbers);
            content += criteriaElement(vals.label_special, criteria.special);
            $strengthLayer.html(content);

            var s = Object.values(criteria).filter(Boolean).length;
            
            // maximum s if password length fails
            if (!criteria.length) s = Math.min(s, vals.extra_criteria);

            updateScore(s);
        }

        function criteriaElement(labelText, isValid) {
            return `
                <div class="criteria-item">
                    <div class="criteria-text">${labelText}</div>
                    <div class="criteria-icon ${isValid ? "valid" : "invalid"}">${isValid ? vals.icon_checkmark : vals.icon_cross}</div>
                </div>
            `;
        }
        function separatorElement(labelSeparator) {
            return `
                <div class="criteria-item">
                    <div class="criteria-separator">${labelSeparator}</div>
                </div>
            `;
        }
    });

    return {
        getScore: function(index) {
            return score[index];
        }
    };
}