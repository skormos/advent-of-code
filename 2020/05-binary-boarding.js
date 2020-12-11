const fs = require('fs');

class Seat {
    constructor(partitionID) {
        this.partitionID = partitionID;
        this.id = parseInt(
            partitionID.replace(/[FL]/ig, '0').replace(/[BR]/ig, '1'),
            2
        );
        this.column = this.id % 8;
        this.row = this.id >> 3;
    }
}

fs.readFile('./05-binary-boarding.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }

    let maxSeatID = data.split('\n').reduce((maxID, partitionID) => {
        seat = new Seat(partitionID);
        if (seat.id > maxID) {
            return seat.id;
        }
        return maxID;
    }, 0);

    console.log(maxSeatID);
});

fs.readFile('./05-binary-boarding.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error(err);
    }

    const seatIDs = data.split('\n').map(value => new Seat(value).id);
    const orderedIDs = [];

    for (let i = 0; i < seatIDs.length; i++) {
        orderedIDs[seatIDs[i]] = seatIDs[i];
    }

    for (let i = 978; i >= 0; i--) {
        if (orderedIDs[i] !== i) {
            return console.log(i);
        }
    }

    return console.log("not found");
});
