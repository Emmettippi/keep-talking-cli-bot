const Bomb = require('../bomb');

const helpDefuseWires = () => {
    console.log('    DEFUSE WIRES [BLACK|BLUE|RED|WHITE|YELLOW]{3, 6}');
    console.log('    "defuse wires" acetta da 3 a 6 colori come argomenti.');
    console.log('');
    console.log('    È possibile troncare i colori. Es: è possibile abbreviare "black" con "bla" ma non con "cl" perché anche "blue" inizia per "bl".');
    console.log('');
}

const defuseFor3 = (...wires) => {
    if (!wires.includes('red')) {
        console.log('    Taglia il secondo cavo.');
    } else if (wires[2] === 'white') {
        console.log('    Taglia l\'ultimo cavo.');
    } else if (wires.filter(w => w === 'blue').length >= 2) {
        console.log('    Taglia l\'ultimo cavo blu.');
    } else {
        console.log('    Taglia l\'ultimo cavo.');
    }
}

const defuseFor4 = (...wires) => {
    if (wires.filter(w => w === 'red').length >= 2
        && Bomb.bomb.lastDigit % 2 === 1) {
        console.log('    Taglia l\'ultimo cavo rosso.');
    } else if (wires[3] === 'yellow'
        && !wires.includes('red')) {
        console.log('    Taglia il primo cavo.');
    } else if (wires.filter(w => w === 'blue').length === 1) {
        console.log('    Taglia il primo cavo.');
    } else if (wires.filter(w => w === 'yellow').length >= 2) {
        console.log('    Taglia l\'ultimo cavo.');
    } else {
        console.log('    Taglia il secondo cavo.');
    }
}

const defuseFor5 = (...wires) => {
    if (wires[4] === 'black'
        && Bomb.bomb.lastDigit % 2 === 1) {
        console.log('    Taglia il quarto cavo.');
    } else if (wires.filter(w => w === 'red').length === 1
        && wires.filter(w => w === 'yellow').length >= 2) {
        console.log('    Taglia il primo cavo.');
    } else if (!wires.includes('black')) {
        console.log('    Taglia il secondo cavo.');
    } else {
        console.log('    Taglia il primo cavo.');
    }
}

const defuseFor6 = (...wires) => {
    if (!wires.includes('black')
        && Bomb.bomb.lastDigit % 2 === 1) {
        console.log('    Taglia il terzo cavo.');
    } else if (wires.filter(w => w === 'yellow').length === 1
        && wires.filter(w => w === 'white').length >= 2) {
        console.log('    Taglia il quarto cavo.');
    } else if (!wires.includes('red')) {
        console.log('    Taglia l\'ultimo cavo.');
    } else {
        console.log('    Taglia il quarto cavo.');
    }
}

const defuseWires = (...args) => {
    if (!args || args.length < 3 || args.length > 6) {
        console.log('    DEFUSE WIRES accetta tra i 3 e i 6 colori come argomenti.');
        return;
    }
    const wires = [];
    let error = false;
    for (const arg of args) {
        switch (arg) {
            case 'bla':
            case 'blac':
            case 'black':
                wires.push('black');
                break;
            case 'w':
            case 'wh':
            case 'whi':
            case 'whit':
            case 'white':
                wires.push('white');
                break;
            case 'r':
            case 're':
            case 'red':
                wires.push('red');
                break;
            case 'blu':
            case 'blue':
                wires.push('blue');
                break;
            case 'y':
            case 'ye':
            case 'yel':
            case 'yell':
            case 'yello':
            case 'yellow':
                wires.push('yellow');
                break;
            default:
                console.log('    Nessun colore riconosciuto per "' + arg + '".');
                error = true;
        }
    }
    if (error) {
        return;
    }

    switch (wires.length) {
        case 3: defuseFor3(...wires); break;
        case 4: defuseFor4(...wires); break;
        case 5: defuseFor5(...wires); break;
        case 6: defuseFor6(...wires); break;
        default:
            console.log('    UNEXPECTED ERROR: ' + JSON.stringify(wires));
    }
};

exports.helpDefuseWires = helpDefuseWires;
exports.defuseWires = defuseWires;
