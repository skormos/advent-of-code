const fs = require("fs");

function rangeValidator(min, max) {
    return (str) => {
        let val = parseInt(str, 10);
        return val >= min && val <= max;
    };
}

const cmHgtValidator = rangeValidator(150, 193);
const inHgtValidator = rangeValidator(59, 76);

class Passport {
    constructor(rawInput) {
        this.fields = rawInput.replace(/\n/g, ' ')
            .split(' ')
            .reduce((map, curr) => {
                let tuple = curr.split(':');
                map.set(tuple[0], tuple[1]);
                return map
            }, new Map());
    }

    static eyeColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);

    static validators = new Map([
        ['byr', rangeValidator(1920, 2002)],
        ['iyr', rangeValidator(2010, 2020)],
        ['eyr', rangeValidator(2020, 2030)],
        ['hgt', (str) => {
            if (str.match(/^(\d{3}cm|\d{2}in)$/g) != null) { // how to do a greedy match here
                if (str.endsWith("cm")) {
                    return cmHgtValidator(str.substr(0, 3));
                } else if (str.endsWith("in")) {
                    return inHgtValidator(str.substr(0,2));
                }
            }
            return false;
        }],
        ['hcl', (str) => str.match(/^#[0-9a-f]{6}$/i) != null],
        ['ecl', (str) => Passport.eyeColors.has(str)],
        ['pid', (str) => str.match(/^[0-9]{9}$/)]
    ]);

    hasRequiredFields() {
         for (const key of Passport.validators.keys()) {
             if (!this.fields.has(key)) {
                 return false;
             }
         }

         return true;
    }

    fieldsAreValid() {
        for (const key of this.fields.keys()) {
            if (key !== 'cid') {
                let validator = Passport.validators.get(key);
                let value = this.fields.get(key);
                if (!validator(value)) {
                    return false;
                }
            }
        }
        return true;
    }
}

fs.readFile('./04-passport-processing.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }

    let validCount = data.split('\n\n').
        reduce((acc, curr) => {
           let passport = new Passport(curr);
           if (passport.hasRequiredFields()) {
               return acc + 1;
           }
           return acc;
        }, 0);

    console.log("required", validCount);
});

fs.readFile('./04-passport-processing.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }

    let validCount = data.split('\n\n').
        reduce((acc, curr) => {
            let passport = new Passport(curr);
            if (passport.hasRequiredFields() && passport.fieldsAreValid()) {
                return acc + 1;
            }
            return acc;
        }, 0);

    console.log("also valid", validCount);
});