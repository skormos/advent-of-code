const fs = require("fs");

fs.readFile('./01-report-repair.txt', 'utf8', repairReport(
    (err) => console.error(err),
    repairReportPair
));

fs.readFile('./01-report-repair.txt', 'utf8', repairReport(
    (err) => console.error(err),
    repairReportTrio
));

function repairReport(errHandler, inputHandler) {
    return function (err, data) {
        if (err) {
            return errHandler(err);
        }

        return inputHandler(data.split('\n').map(str => {
            return parseInt(str, 10);
        }));
    }
}

function repairReportPair(input) {
    outer: for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i] + input[j] === 2020) {
                console.log(input[i], input[j], input[i] * input[j]);
                break outer;
            }
        }
    }
}

function repairReportTrio(input) {
    outer: for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            for (let k = j + 1; k < input.length; k++) {
                if (input[i] + input[j] + input[k] === 2020) {
                    console.log(input[i], input[j], input[k], input[i] * input[j] * input[k]);
                    break outer;
                }
            }
        }
    }
}