const fs = require('fs');

// unique questions answered for the group
fs.readFile('./06-custom-customs.txt', 'utf8', (err, data) => {
    const groups = data.split('\n\n');

    const groupSets = groups.map(value => {
        return new Set(Array.from(value.replace(/\n/g, '').split('')));
    });

    const sum = groupSets.reduce((acc, set) => {
        return acc + set.size;
    }, 0);

    console.log("group", sum);
});

// unique questions answered by everyone in the group
fs.readFile('./06-custom-customs.txt', 'utf8', (err, data) => {
    const groups = data.split('\n\n');

    const groupSets = groups.map(value => {
        let members = value.split('\n');
        let result = new Set(Array.from(members[0].split('')));

        for (let i = 1; i < members.length; i++) {
            result = intersect(result, new Set(Array.from(members[i].split(''))));
        }

        return result;
    });

    const sum = groupSets.reduce((acc, set) => {
        return acc + set.size;
    }, 0);

    console.log("unique", sum);
});

// set intersection
function intersect(first, second) {
    let result = new Set();

    first.forEach(val => {
        if (second.has(val)) {
            result.add(val);
        }
    });

    return result;
}
