const readline = require('../reader').readline;

const helpDefuseWords = () => {
    console.log('    DEFUSE WORDS [word]');
    console.log('    "word" è la parola che si legge nel display.');
    console.log('    Dopo bisognerà inserire la parola del pulsante indicato.');
    console.log('');
    console.log('    IMPORTANTE: NON TRONCARE LE PAROLE!');
    console.log('');
};

const WORD_POSITION = {
    'si': '[3] (Centro Sinistra)'
    , 'primo': '[2] (Alto Destra)'
    , 'display': '[6] (Basso Destra)'
    , 'schermo': '[2] (Alto Destra)'
    , 'scherno': '[6] (Basso Destra)'
    , 'nulla': '[3] (Centro Sinistra)'
    , '': '[5] (Basso Sinistra)'
    , 'vuoto': '[4] (Centro Destra)'
    , 'no': '[6] (Basso Destra)'
    , 'scherzo': '[3] (Centro Sinistra)'
    , 'fermo': '[6] (Basso Destra)'
    , 'stop': '[4] (Centro Destra)'
    , 'spingi': '[4] (Centro Destra)'
    , 'ah ah': '[5] (Basso Sinistra)'
    , 'terzo': '[5] (Basso Sinistra)'
    , 'aspetta': '[6] (Basso Destra)'
    , 'ok': '[4] (Centro Destra)'
    , 'no no': '[6] (Basso Destra)'
    , 'sii': '[4] (Centro Destra)'
    , 'si si': '[4] (Centro Destra)'
    , 'come?': '[1] (Alto Sinistra)'
    , 'sopra': '[6] (Basso Destra)'
    , 'in alto': '[5] (Basso Sinistra)'
    , 'sotto': '[4] (Centro Destra)'
    , 'in basso': '[3] (Centro Sinistra)'
    , 'ah': '[6] (Basso Destra)'
    , 'a': '[2] (Alto Destra)'
    , 'ha': '[6] (Basso Destra)'
}

const WORD_MATRIX = {
    'pronto': 'SI, OKAY, COSA, IN MEZZO, SINISTRA, OK, DESTRA, VUOTO, PRONTO'
    , 'primo': 'SINISTRA, OKAY, SI, IN MEZZO, NO, DESTRA, NULLA, EH, FERMO, PRONTO, VUOTO, COSA, OK, PRIMO'
    , 'no': 'VUOTO, EH, FERMO, PRIMO, COSA, PRONTO, DESTRA, SI, NULLA, SINISTRA, OK, OKAY, NO'
    , 'vuoto': 'FERMO, DESTRA, OKAY, IN MEZZO, VUOTO'
    , 'nulla': 'EH, DESTRA, OKAY, IN MEZZO, SI, VUOTO, NO, OK, SINISTRA, COSA, FERMO, PRIMO, NULLA'
    , 'si': 'OKAY, DESTRA, EH, IN MEZZO, PRIMO, COSA, OK, PRONTO, NULLA, SI'
    , 'cosa': 'EH, COSA'
    , 'eh': 'PRONTO, NULLA, SINISTRA, COSA, OKAY, SI, DESTRA, NO, OK, VUOTO, EH, IN MEZZO, FERMO, PRIMO'
    , 'Sinistra)': 'DESTRA, Sinistra)'
    , 'Destra)': 'SI, NULLA, PRONTO, OK, NO, FERMO, COSA, Destra)'
    , 'in mezzo': 'VUOTO, PRONTO, OKAY, COSA, NULLA, OK, NO, FERMO, SINISTRA, IN MEZZO'
    , 'okay': 'IN MEZZO, NO, PRIMO, SI, EH, NULLA, FERMO, OKAY'
    , 'fermo': 'EH, NO, VUOTO, OKAY, SI, SINISTRA, PRIMO, OK, COSA, FERMO'
    , 'ok': 'DESTRA, IN MEZZO, SI, PRONTO, OK'
    , 'premi': 'CERTO, NO NO, SII, SI SI, DOPO, EH?, COME?, ALT, COSA?, PREMI'
    , 'no no': 'SII, DOPO, COME, EH?, COSA?, FATTO, E?, ALT, PREMI, NOO, SI SI, CERTO, COME?, NO NO'
    , 'sii': 'E?, NO NO, EH?, SII'
    , 'si si': 'PREMI, SI SI'
    , 'come?': 'FATTO, NOO, COME?'
    , 'noo': 'EH?, CERTO, DOPO, COSA?, SI SI, COME?, E?, FATTO, NOO'
    , 'eh?': 'EH?'
    , 'e?': 'COME?, NOO, NO NO, SI SI, DOPO, E?'
    , 'cosa?': 'PREMI, ALT, SI SI, SII, NOO, FATTO, E?, COME, NO NO, EH?, COME?, DOPO, COSA?'
    , 'fatto': 'CERTO, EH?, DOPO, COSA?, SII, COME?, SI SI, ALT, COME, PREMI, NOO, NO NO, E?, FATTO'
    , 'dopo': 'COSA?, EH?, E?, SII, ALT, CERTO, DOPO'
    , 'alt': 'NO NO, NOO, FATTO, E?, PREMI, COME?, CERTO, COSA?, SI SI, DOPO, ALT'
    , 'certo': 'NO NO, FATTO, COME, SI SI, PREMI, ALT, EH?, COME?, CERTO'
    , 'come': 'SI SI, DOPO, NOO, COME?, ALT, FATTO, E?, COSA?, EH?, PREMI, COME'
}

const askDisplayWord = () => {
    return new Promise(resolve => {
        readline.question('  Parola nel display [""]: ', (input) => {
            resolve(input.toLowerCase().trim());
        });
    });
};

const askSecondWord = (secondQuestion = '') => {
    return new Promise(resolve => {
        readline.question(secondQuestion, (input) => {
            input = input.toLowerCase().trim();
            if (!WORD_MATRIX[input]) {
                console.log('    "' + input + '" non è una parola valida.');
            } else {
                console.log('    ' + WORD_MATRIX[input]);
            }
            resolve();
        });
    });
};

const defuseWords = async (...args) => {
    let word = '';
    if (!args || !args.length) {
        word = await askDisplayWord();
    } else {
        for (const arg of args) {
            word += arg + ' ';
        }
        word = word.trim();
    }

    if (!WORD_POSITION[word]) {
        console.log('    "' + word + '" non è una parola valida.');
    } else {
        await askSecondWord('  Parola del pulsante ' + WORD_POSITION[word] + ' [""]: ');
    }
};

exports.helpDefuseWords = helpDefuseWords;
exports.defuseWords = defuseWords;
