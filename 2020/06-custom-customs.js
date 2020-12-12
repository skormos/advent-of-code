const fs = require('fs');

fs.readFile('./06-custom-customs.txt', 'utf8', (err, data) => {
    const groups = data.split('\n\n');

    const groupSets = groups.map(value => {
        return new Set(Array.from(value.replace(/\n/g, '').split('')));
    });

    const sum = groupSets.reduce((acc, set) => {
        return acc + set.size;
    }, 0);

    console.log("unique", sum);
});

