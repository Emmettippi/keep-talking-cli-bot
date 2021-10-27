const helpDefuseMorse = () => {
    console.log('    DEFUSE MORSE ...(DOT|LINE|SPACE|RESET)');
    console.log('    Inserisci (DOT|LINE) separati da SPACE per indicare una lettera.');
    console.log('    Non inserire parte della lettera: assicurati di inserire la lettera intera.');
    console.log('');
    console.log('    È suggerito troncare i comandi.');
    console.log('    Esempio: "DEFUSE MORSE d d d s d r d d l d" corrisponde a "S E - F", quindi a "forse".');
    console.log('');
};

const MORSE = {
    'dl': 'a'
    , 'lddd': 'b'
    , 'ldld': 'c'
    , 'ldd': 'd'
    , 'd': 'e'
    , 'ddld': 'f'
    , 'lld': 'g'
    , 'dddd': 'h'
    , 'dd': 'i'
    , 'dlll': 'j'
    , 'ldl': 'k'
    , 'dldd': 'l'
    , 'll': 'm'
    , 'ld': 'n'
    , 'lll': 'o'
    , 'dlld': 'p'
    , 'lldl': 'q'
    , 'dld': 'r'
    , 'ddd': 's'
    , 'l': 't'
    , 'ddl': 'u'
    , 'dddl': 'v'
    , 'dll': 'w'
    , 'lddl': 'x'
    , 'ldll': 'y'
    , 'lldd': 'z'
};

const FREQUENCES = {
    'bolle': '3.505 MHz'
    , 'resto': '3.515 MHz'
    , 'pollo': '3.522 MHz'
    , 'morso': '3.532 MHz'
    , 'verso': '3.535 MHz'
    , 'terre': '3.542 MHz'
    , 'anche': '3.545 MHz'
    , 'paura': '3.552 MHz'
    , 'pelle': '3.555 MHz'
    , 'chela': '3.565 MHz'
    , 'pasto': '3.572 MHz'
    , 'bombe': '3.575 MHz'
    , 'pausa': '3.582 MHz'
    , 'sauna': '3.592 MHz'
    , 'forse': '3.595 MHz'
    , 'sorso': '3.600 MHz'
};

const translateArgsToMorse = (...args) => {
    let letters = [];
    let arrayMethod = 'push';
    let morse = '';
    let slice = 1;

    const addLetter = () => {
        if (!morse) {
            return true;
        }
        if (!MORSE[morse]) {
            console.log('    "' + morse + '" non è un carattere morse.');
            return false;
        }
        if (arrayMethod === 'push') {
            letters[arrayMethod](MORSE[morse]);
        } else if (arrayMethod === 'slice') {
            letters = [...letters[arrayMethod](0, slice), MORSE[morse], ...letters[arrayMethod](slice)];
            slice++;
        }
        morse = '';
        return true;
    }

    for (const arg of args) {
        if (arg === 's') {
            if (!addLetter()) {
                return null;
            }
        } else if (arg === 'r') {
            if (!addLetter()) {
                return null;
            }

            letters.push('$');
            letters.unshift('');
            letters.unshift('^');
            arrayMethod = 'slice';
            morse = '';
        } else {
            morse += arg;
        }
    }

    if (!addLetter()) {
        return null;
    }
    return letters;
};

const retriveRegex = (...letters) => {
    if (!letters || !letters.length) {
        console.log('    Impossibile recuperare le lettere in formato morse.');
        return null;
    }

    let beginningRegex = '';
    let endRegex = '';
    let middleRegex = '';
    let hasBeginning = letters.includes('^');
    let hasEnd = letters.includes('$');
    let count = 0;
    let letter = '';
    let i;
    if (hasBeginning) {
        i = 0;
        letter = letters[i];
        while (letter) {
            beginningRegex += letter;
            if (i !== 0) {
                count++;
            }
            i++;
            letter = letters[i];
        }
    }

    if (hasEnd) {
        i = letters.length - 1;
        letter = letters[i];
        while (letter) {
            endRegex = letter + endRegex;
            if (i !== letters.length - 1) {
                count++;
            }
            i--;
            letter = letters[i];
        }
    }

    if (count > 5) {
        console.log('    Troppe lettere.');
        return null;
    }

    if (hasBeginning || hasEnd) {
        middleRegex = '[a-z]{' + (5 - count) + '}';
    } else {
        if (letters.length > 5) {
            console.log('    Troppe lettere.');
            return null;
        }

        for (const lett of letters) {
            middleRegex += lett;
            count++;
        }

        beginningRegex = '^[a-z]{0,' + (5 - count) + '}';
        endRegex = '[a-z]{0,' + (5 - count) + '}$';
    }

    let regex = beginningRegex + middleRegex + endRegex;
    if (!regex.startsWith('^')) {
        regex = '^' + regex;
    }
    if (!regex.endsWith('$')) {
        regex += '$';
    }

    return regex;
}

const defuseMorse = (...args) => {
    if (!args || !args.length) {
        console.log('    Sono richiesti gli argomenti ...(DOT|LINE|SPACE|RESET).');
        return;
    }
    let errors = [];
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        switch (arg) {
            case 'd':
            case 'do':
            case 'dot':
                args[i] = 'd';
                break;
            case 'l':
            case 'li':
            case 'lin':
            case 'line':
                args[i] = 'l';
                break;
            case 's':
            case 'sp':
            case 'spa':
            case 'spac':
            case 'space':
                args[i] = 's';
                break;
            case 'r':
            case 're':
            case 'res':
            case 'rese':
            case 'reset':
                args[i] = 'r';
                break;
            default:
                errors.push(arg);
        }
    }
    if (errors.length) {
        for (const err of errors) {
            console.log('    "' + err + '" non è un comando riconosciuto.');
        }
        console.log('');
        return;
    }

    if (args.filter(l => l === 'r') > 1) {
        console.log('    DEFUSE MORSE non può contenere più di un argomento RESET.');
        console.log('');
        return;
    }
    if (args.length === 1 && args[0] === 'r') {
        console.log('    Argomenti non validi.');
        return;
    }

    let letters = translateArgsToMorse(...args);
    if (!letters) {
        return;
    }
    if (letters.length >= 2 && letters[0] === '^' && letters[1] === '') {
        letters = letters.slice(2);
    }
    if ((letters.length >= 2 && letters[letters.length - 1] === '$' && letters[letters.length - 2] === '')) {
        letters = letters.slice(0, letters.length - 2);
    }

    const regex = retriveRegex(...letters);
    const keys = [];
    Object.keys(FREQUENCES).forEach((key) => {
        if (key.match(regex)) {
            keys.push(key);
        }
    });

    if (keys.length === 0) {
        console.log('    Nessuna parola corrisponde alle lettere inserite.');
    } else {
        for (const key of keys) {
            console.log('    ' + key + ': ' + FREQUENCES[key]);
        }
    }
    console.log('');
};

exports.helpDefuseMorse = helpDefuseMorse;
exports.defuseMorse = defuseMorse;
