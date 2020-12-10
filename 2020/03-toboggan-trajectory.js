const fs = require("fs");

fs.readFile('./03-toboggan-trajectory.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }
    const treeCount = treeFinder(3, 1, data);
    console.log("single", 3, 1, treeCount);
});

fs.readFile('./03-toboggan-trajectory.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }

    let points = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];

    let product = points.reduce((acc, curr) => {
        let result = treeFinder(curr[0], curr[1], data);
        console.log("multi", curr[0], curr[1], result);

        return acc * result;
    }, 1);

    console.log("total", product);
});

function treeFinder(slopeCol, slopeRow, data) {
    const rows = data.split('\n').map(line => line);
    const maxColumns = rows[0].length;

    let treeCount = 0;

    let r = 0;
    let c = 0;

    while (r < rows.length) {
        c += slopeCol;
        c = c % maxColumns;

        r += slopeRow;

        let row = Object.assign([], rows[r]);
        if (row[c] === "#") {
            treeCount++;
        }
    }

    return treeCount;
}