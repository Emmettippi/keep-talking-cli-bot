const readline = require('./reader').readline;

const serialVowelQuestion = () => {
    return new Promise(resolve => {
        readline.question('  Vocale presente nel numero seriale [y/N]: ', async (input) => {
            switch (input) {
                case 'y':
                case 'ye':
                case 'yes':
                    Bomb.bomb.vowel = true;
                    resolve();
                    break;
                case '':
                case 'n':
                case 'no':
                    Bomb.bomb.vowel = false;
                    resolve();
                    break;
                default:
                    await serialVowelQuestion();
                    resolve();
                    break;
            }
        });
    });
}

const serialDigitQuestion = () => {
    return new Promise(resolve => {
        readline.question('  Ultima cifra del numero seriale [0]: ', async (input) => {
            if (!input) {
                input = '0';
            }
            const num = parseInt(input, 10);
            if (num || num === 0) {
                Bomb.bomb.lastDigit = num;
                resolve();
            } else {
                await serialDigitQuestion();
                resolve();
            }
        });
    });
}

const parallelQuestion = () => {
    return new Promise(resolve => {
        readline.question('  Almeno una porta parallela [y/N]: ', async (input) => {
            switch (input) {
                case 'y':
                case 'ye':
                case 'yes':
                    Bomb.bomb.parallel = true;
                    resolve();
                    break;
                case '':
                case 'n':
                case 'no':
                    Bomb.bomb.parallel = false;
                    resolve();
                    break;
                default:
                    await parallelQuestion();
                    resolve();
                    break;
            }
        });
    });
}

const batteriesQuestion = () => {
    return new Promise(resolve => {
        readline.question('  Quante batterie [0]: ', async (input) => {
            if (!input) {
                input = '0';
            }
            const num = parseInt(input, 10);
            if (num || num === 0) {
                Bomb.bomb.lastDigit = num;
                resolve();
            } else {
                await batteriesQuestion();
                resolve();
            }
        });
    });
}

const frkQuestion = () => {
    return new Promise(resolve => {
        readline.question('  Indicatore "frk" acceso [y/N]: ', async (input) => {
            switch (input) {
                case 'y':
                case 'ye':
                case 'yes':
                    Bomb.bomb.frk = true;
                    resolve();
                    break;
                case '':
                case 'n':
                case 'no':
                    Bomb.bomb.frk = false;
                    resolve();
                    break;
                default:
                    await frkQuestion();
                    resolve();
                    break;
            }
        });
    });
}

const carQuestion = () => {
    return new Promise(resolve => {
        readline.question('  Indicatore "car" acceso [y/N]: ', async (input) => {
            switch (input) {
                case 'y':
                case 'ye':
                case 'yes':
                    Bomb.bomb.car = true;
                    resolve();
                    break;
                case '':
                case 'n':
                case 'no':
                    Bomb.bomb.car = false;
                    resolve();
                    break;
                default:
                    await carQuestion();
                    resolve();
                    break;
            }
        });
    });
}

var Bomb = module.exports = {
    bomb: {
        car: false
        , frk: false
        , batteries: 0
        , parallel: false
        , lastDigit: 0
        , vowel: false
    }
    , command: async (...args) => {
        if (args && args.length) {
            switch (args[0]) {
                case 'c':
                case 'ch':
                case 'che':
                case 'chec':
                case 'check':
                    Bomb.check();
                    break;
                case 's':
                case 'se':
                case 'set':
                    await Bomb.set();
                    break;
                case 'r':
                case 're':
                case 'res':
                case 'rese':
                case 'reset':
                    Bomb.reset();
                    break;
                default:
                    console.log('    "' + args[0] + '" non è un comando bomba riconosciuto.');
            }
        } else {
            Bomb.check();
        }
    }
    , check: () => {
        console.log('    "car":                    ' + Bomb.bomb.car);
        console.log('    "frk":                    ' + Bomb.bomb.frk);
        console.log('    Batterie:                 ' + Bomb.bomb.batteries);
        console.log('    Porta parallela:          ' + Bomb.bomb.parallel);
        console.log('    Ultima cifra del seriale: ' + Bomb.bomb.lastDigit);
        console.log('    Vocale nel seriale:       ' + Bomb.bomb.vowel);
    }
    , set: async () => {
        await carQuestion();
        await frkQuestion();
        await batteriesQuestion();
        await parallelQuestion();
        await serialDigitQuestion();
        await serialVowelQuestion();
        Bomb.check();
    }
    , reset: (log = true) => {
        Bomb.bomb = {
            car: false
            , frk: false
            , batteries: 0
            , parallel: false
            , lastDigit: 0
            , vowel: false
        };
        if (log) {
            console.log('    Bomba resettata alle impostazioni di base:');
            Bomb.check();
        }
    }
    , helpBomb: (...args) => {
        if (args && args.length) {
            switch (args[0]) {
                case 'check':
                    console.log('    Controlla le impostazioni della bomba.');
                    break;
                case 'set':
                    console.log('    Permette di modificare le impostazioni della bomba.');
                    break;
                case 'reset':
                    console.log('    Resetta le impostazioni della bomba.');
                    break;
            }
        } else {
            console.log('bomb è seguito dai seguenti argomenti:');
            console.log('    CHECK');
            console.log('    SET');
            console.log('    RESET');
        }
    }
}
