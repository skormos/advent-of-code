const fs = require("fs");

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

    static requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

    valid() {
        return Passport.requiredFields.reduce((acc, name) => {
            return acc && this.fields.has(name);
        }, true);
    }
}

fs.readFile('./04-passport-processing.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }

    // let validCount = data.split(/\n\n/);
    let validCount = data.split('\n\n').
        reduce((acc, curr) => {
           let passport = new Passport(curr);
           if (passport.valid()) {
               return acc + 1;
           }
           return acc;
        }, 0);

    console.log(validCount);
});