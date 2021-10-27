const Bomb = require('../bomb');
const readline = require('../reader').readline;

let currentStrikes = 0;

const colorMatrix = [{
    red: ['Blu ', 'Giallo ', 'Verde ']
    , blue: ['Rosso ', 'Verde ', 'Rosso ']
    , green: ['Giallo ', 'Blu ', 'Giallo ']
    , yellow: ['Verde ', 'Rosso ', 'Blu']
}, {
    red: ['Blu ', 'Rosso ', 'Giallo ']
    , blue: ['Giallo ', 'Blu ', 'Verde ']
    , green: ['Verde ', 'Giallo ', 'Blu ']
    , yellow: ['Rosso ', 'Verde ', 'Rosso ']
}]

const helpDefuseSimon = () => {
    console.log('    DEFUSE COLORS [STRIKES 0|1|2]');
    console.log('    È possibile inserire subito il numero degli errori.');
    console.log('    Utilizzare [RED|BLUE|GREEN|YELLOW] per capire quale pulsante premere.');
    console.log('    Utilizzare [EXIT|QUIT|DONE] per tornare al menù precedente.');
    console.log('');
    console.log('    È possibile troncare i nomi dei vari comandi.');
    console.log('');
};

const setStrikes = (input) => {
    let strikes = parseInt(input, 10);
    if (strikes === 0 || strikes) {
        if (strikes < 0) {
            strikes = 0;
        }
        if (strikes > 2) {
            strikes = 2;
        }
        currentStrikes = strikes;
    } else {
        currentStrikes = 0;
    }
}

const currentStrikesQuestion = async () => {
    return new Promise(resolve => {
        readline.question('  Errori correnti [0/1/2, default: 0]: ', (input) => {
            setStrikes(input);
            resolve();
        });
    });
}

const colorQuestion = async () => {
    return new Promise(resolve => {
        readline.question('  Colori [quit]: ', async (input) => {
            while (input.includes('  ')) {
                input = input.replace('  ', ' ');
            }
            const splitted = input.trim().toLowerCase().split(' ');
            if (!splitted[0] || 'exit'.startsWith(splitted[0]) || 'quit'.startsWith(splitted[0]) || 'done'.startsWith(splitted[0])) {
                resolve();
            } else if (splitted.length === 2 && 'strikes'.startsWith(splitted[0])) {
                setStrikes(splitted[1]);
                await colorQuestion();
                resolve();
            } else {
                const vowel = Bomb.bomb.vowel ? 0 : 1;
                let colors = '';
                for (const c of splitted) {
                    switch (c) {
                        case 'r':
                        case 're':
                        case 'red':
                            colors += colorMatrix[vowel]['red'][currentStrikes];
                            break;
                        case 'b':
                        case 'bl':
                        case 'blu':
                        case 'blue':
                            colors += colorMatrix[vowel]['blue'][currentStrikes];
                            break;
                        case 'g':
                        case 'gr':
                        case 'gre':
                        case 'gree':
                        case 'green':
                            colors += colorMatrix[vowel]['green'][currentStrikes];
                            break;
                        case 'y':
                        case 'ye':
                        case 'yel':
                        case 'yell':
                        case 'yello':
                        case 'yellow':
                            colors += colorMatrix[vowel]['yellow'][currentStrikes];
                            break;
                        default:
                            console.log('    "' + c + '" non è un colore riconosciuto.');
                    }
                }
                console.log('    Premi nell\'ordine: ' + colors);
                await colorQuestion();
                resolve();
            }
        });
    });
}

const defuseSimon = async (...args) => {
    if (args && args.length && args[0]) {
        setStrikes(args[0]);
    } else {
        await currentStrikesQuestion();
    }
    await colorQuestion();
};

exports.helpDefuseSimon = helpDefuseSimon;
exports.defuseSimon = defuseSimon;
