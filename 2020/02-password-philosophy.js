const fs = require("fs");

class MinMaxPasswordPolicy {
    constructor(policyString) {
        const rules = policyString.split(" ");
        const minMax = rules[0].split("-");

        this.min = parseInt(minMax[0], 10);
        this.max = parseInt(minMax[1], 10);
        this.required = rules[1];
    }

    compliant(password) {
        let count = [...password].reduce((acc, curr) => {
            if (curr === this.required) {
                return acc + 1;
            }
            return acc
        }, 0);

        return count >= this.min && count <= this.max;
    }
}

class PositionPasswordPolicy {
    constructor(policyString) {
        const rules = policyString.split(" ");

        const positions = rules[0].split("-");
        this.firstPosition = parseInt(positions[0], 10) - 1; // rule is 1-based index
        this.secondPosition = parseInt(positions[1], 10) - 1; // rule is 1-based index
        this.required = rules[1];
    }

    compliant(password) {
        const first = password[this.firstPosition] === this.required;
        const second = password[this.secondPosition] === this.required;

        return first && !second || second && !first;
    }
}

fs.readFile('./02-password-philosophy.txt', 'utf8', passwordComplianceChecker(
    (err) => console.error(err),
    MinMaxPasswordPolicy,
    validEntryCounter
));

fs.readFile('./02-password-philosophy.txt', 'utf8', passwordComplianceChecker(
    (err) => console.error(err),
    PositionPasswordPolicy,
    validEntryCounter
));

function passwordComplianceChecker(errHandler, policyClass, entryReducer) {
    return (err, input) => {
        if (err) {
            return errHandler(err);
        }

        entries = input.split('\n').map((val) => {
            return new PasswordEntry(val, policyClass);
        });

        return console.log(entryReducer(entries));
    }
}

function validEntryCounter(entries) {
    return entries.reduce((acc, val) => {
        if (val.compliant()) {
            return acc + 1;
        }
        return acc;
    }, 0);
}

class PasswordEntry {
    constructor(entry, policyClass) {
        const policyPassword = entry.split(": ");
        this.password = policyPassword[1];
        this.policy = new policyClass(policyPassword[0]);
    }

    compliant() {
        return this.policy.compliant(this.password);
    }
}
