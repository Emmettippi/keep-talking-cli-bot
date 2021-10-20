const readline = require('../reader').readline;
const Bomb = require('../bomb');

const helpDefuseButton = () => {
    console.log('    DEFUSE BUTTON [BLUE|RED|WHITE|YELLOW] text');
    console.log('    "defuse button" acetta esattamente 2 argomenti: il colore e il testo del pulsante.');
    console.log('');
    console.log('    È possibile troncare il colore. Il testo NON si deve troncare.');
    console.log('');
}

const holdButton = async () => {
    return new Promise(resolve => {
        console.log('    Tieni premuto.');
        readline.question('  Indica il colore della striscia luminosa: ', (input) => {
            switch (input) {
                case 'b':
                case 'bl':
                case 'blu':
                case 'blue':
                    console.log('    Rilascia quando il timer ha un 4.');
                    break;
                case 'y':
                case 'ye':
                case 'yel':
                case 'yell':
                case 'yello':
                case 'yellow':
                    console.log('    Rilascia quando il timer ha un 5.');
                    break;
                default:
                    console.log('    Rilascia quando il timer ha un 1.');
            }
            resolve();
        });
    });
}

const defuseButton = async (...args) => {
    if (!args || args.length !== 2) {
        console.log('    DEFUSE BUTTON accetta esattamente 2 argomenti.');
        return;
    }
    let color = 'other';
    let text = 'other';
    switch (args[0]) {
        case 'b':
        case 'bl':
        case 'blu':
        case 'blue':
            color = 'blue';
            break;
        case 'w':
        case 'wh':
        case 'whi':
        case 'whit':
        case 'white':
            color = 'white';
            break;
        case 'y':
        case 'ye':
        case 'yel':
        case 'yell':
        case 'yello':
        case 'yellow':
            color = 'yellow';
            break;
        case 'r':
        case 're':
        case 'red':
            color = 'red';
            break;
    }

    switch (args[1]) {
        case 'annulla':
            text = 'annulla';
            break;
        case 'detona':
            text = 'detona';
            break;
        case 'tieni':
            text = 'tieni';
            break;
    }

    if (color === 'blue' && text === 'annulla') {
        await holdButton();
    } else if (Bomb.bomb.batteries >= 2 && text === 'detona') {
        console.log('    Premi e rilascia il pulsante.');
    } else if (color === 'white' && Bomb.bomb.car) {
        await holdButton();
    } else if (Bomb.bomb.batteries >= 3 && Bomb.bomb.frk) {
        console.log('    Premi e rilascia il pulsante.');
    } else if (color === 'yellow') {
        await holdButton();
    } else if (color === 'red' && text === 'tieni') {
        console.log('    Premi e rilascia il pulsante.');
    } else {
        await holdButton();
    }
}

exports.helpDefuseButton = helpDefuseButton;
exports.defuseButton = defuseButton;
