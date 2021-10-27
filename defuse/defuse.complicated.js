const Bomb = require('../bomb');
const readline = require('../reader').readline;

const helpDefuseComplicated = () => {
    console.log('    DEFUSE COMPLICATED');
    console.log('    Per ogni cavo inserire da 1 a 4 argomenti tra ...(LED|RED|BLUE|STAR).');
    console.log('    È possibile inserire NONE per indicare un cavo Bianco senza Led e Stella.');
    console.log('    Inserire DONE|EXIT|QUIT o niente quando si hanno terminato i cavi.');
    console.log('');
    console.log('    È possibile troncare i comandi.');
    console.log('    Es: "L R" indica un cavo Rosso (o Rosso e Bianco) con Led acceso senza stella.');
    console.log('');
};

/**
 * [] IS ABOUT LED
 * 
 * [][] IS ABOUT RED
 * 
 * [][][] IS ABOUT BLUE
 * 
 * [][][][] IS ABOUT STAR
 */
const COMPLICATED_MATRIX = [
    [ // LED IS OFF
        [ // WIRE IS NOT RED
            ['t', 't'] // WIRE IS NOT BLUE
            , ['s', 'n'] // WIRE IS BLUE
        ] // [ NOT STAR, STAR ]
        , [ // WIRE IS RED
            ['s', 't'] // WIRE IS NOT BLUE
            , ['s', 'p'] // WIRE IS BLUE
        ] // [ NOT STAR, STAR ]
    ]
    , [ // LED IS ON
        [ // WIRE IS NOT RED
            ['n', 'b'] // WIRE IS NOT BLUE
            , ['p', 'p'] // WIRE IS BLUE
        ] // [ NOT STAR, STAR ]
        , [ // WIRE IS RED
            ['b', 'b'] // WIRE IS NOT BLUE
            , ['s', 'n'] // WIRE IS BLUE
        ] // [ NOT STAR, STAR ]
    ]
];

const complicatedCalc = (...args) => {
    if (!args) {
        args = [];
    }
    const led = args.includes('l') ? 1 : 0;
    const red = args.includes('r') ? 1 : 0;
    const blue = args.includes('b') ? 1 : 0;
    const star = args.includes('s') ? 1 : 0;
    const result = COMPLICATED_MATRIX[led][red][blue][star];

    let cut = false;
    switch (result) {
        case 't':
            cut = true;
            break;
        case 'b':
            cut = Bomb.bomb.batteries >= 2;
            break;
        case 's':
            cut = Bomb.bomb.lastDigit % 2 === 0;
            break;
        case 'p':
            cut = Bomb.bomb.parallel;
            break;
        case 'n':
            cut = false;
            break;
        default:
            return;
    }
    if (cut) {
        console.log('    TAGLIA!');
    } else {
        console.log('    NON TAGLIARE!');
    }
};

const complicatedQuestion = async () => {
    return new Promise(resolve => {
        readline.question('  Cavo [none]: ', async (input) => {
            while (input.includes('  ')) {
                input = input.replace('  ', ' ');
            }
            const splitted = input.trim().toLowerCase().split(' ');
            if (!splitted[0] || splitted.length === 1 && 'none'.startsWith(splitted[0])) {
                wire = [];
                complicatedCalc(...[]);
                await complicatedQuestion();
                resolve();
            } else if ('exit'.startsWith(splitted[0]) || 'quit'.startsWith(splitted[0]) || 'done'.startsWith(splitted[0])) {
                resolve();
            } else {
                let wire = [];
                let error = false;
                for (const c of splitted) {
                    switch (c) {
                        case 'l':
                        case 'le':
                        case 'led':
                            wire.push('l');
                            break;
                        case 'r':
                        case 're':
                        case 'red':
                            wire.push('r');
                            break;
                        case 'b':
                        case 'bl':
                        case 'blu':
                        case 'blue':
                            wire.push('b');
                            break;
                        case 's':
                        case 'st':
                        case 'sta':
                        case 'star':
                            wire.push('s');
                            break;
                        case 'n':
                        case 'no':
                        case 'non':
                        case 'none':
                            break;
                        default:
                            console.log('    "' + c + '" non è una proprietà valida.');
                            error = true;
                    }
                }
                if (!error) {
                    complicatedCalc(...wire);
                }
                await complicatedQuestion();
                resolve();
            }
        });
    });
};

const defuseComplicated = async (...args) => {
    await complicatedQuestion();
};

exports.helpDefuseComplicated = helpDefuseComplicated;
exports.defuseComplicated = defuseComplicated;
