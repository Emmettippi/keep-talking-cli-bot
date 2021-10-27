const wires = require('./defuse.wires');
const button = require('./defuse.button');
const symbols = require('./defuse.symbols');
const simon = require('./defuse.simon');
const words = require('./defuse.words');
const memory = require('./defuse.memory');
const morse = require('./defuse.morse');
const complicated = require('./defuse.complicated');

const helpDefuse = (...args) => {
    if (args && args.length) {
        switch (args[0]) {
            case 'wires':
                wires.helpDefuseWires();
                break;
            case 'button':
                button.helpDefuseButton();
                break;
            case 'symbols':
                symbols.helpDefuseSymbols();
                break;
            case 'colors':
                simon.helpDefuseSimon();
                break;
            case 'words':
                words.helpDefuseWords();
                break;
            case 'memory':
                memory.helpDefuseMemory();
                break;
            case 'morse':
                morse.helpDefuseMorse();
                break;
            case 'complicated':
                complicated.helpDefuseComplicated();
                break;
            case 'sequence':
                break;
            case 'maze':
                break;
            case 'password':
                break;
            default:
                console.log('    "' + args[0] + '" non è un modulo riconosciuto.');
        }
    } else {
        console.log('DEFUSE è seguito sempre da [modulo] e da [argomenti]. I moduli sono i seguenti:');
        console.log('    WIRES color1 color2 color3 [color4 [color5 [color6]]]');
        console.log('    BUTTON color text');
        console.log('    SYMBOLS symbol1 symbol2 symbol3 symbol4');
        console.log('    COLORS');
        console.log('    WORDS word');
        console.log('    MEMORY');
        console.log('    MORSE');
        console.log('    COMPLICATED');
        console.log('    SEQUENCE');
        console.log('    MAZE green1 green2 triangle you');
        console.log('    PASSWORD col1 col2 col3 [col4 [col5]]');
        console.log('');
        console.log('    È possibile troncare il modulo. Es: è possibile abbreviare "wires" con "wir" ma non con "w" perché anche "words" inizia per "w".');
        console.log('');
    }
}

const defuse = async (...args) => {
    if (args && args.length) {
        switch (args[0]) {
            case 'wi':
            case 'wir':
            case 'wire':
            case 'wires':
                wires.defuseWires(...args.slice(1));
                break;
            case 'b':
            case 'bu':
            case 'but':
            case 'butt':
            case 'butto':
            case 'button':
                await button.defuseButton(...args.slice(1));
                break;
            case 'sy':
            case 'sym':
            case 'symb':
            case 'symbo':
            case 'symbol':
            case 'symbols':
                symbols.defuseSymbols(...args.slice(1));
                break;
            case 'col':
            case 'colo':
            case 'color':
            case 'colors':
                await simon.defuseSimon(...args.slice(1));
                break;
            case 'wo':
            case 'wor':
            case 'word':
            case 'words':
                await words.defuseWords(...args.slice(1));
                break;
            case 'me':
            case 'mem':
            case 'memo':
            case 'memor':
            case 'memory':
                await memory.defuseMemory(...args.slice(1));
                break;
            case 'mo':
            case 'mor':
            case 'mors':
            case 'morse':
                morse.defuseMorse(...args.slice(1));
                break;
            case 'com':
            case 'comp':
            case 'compl':
            case 'compli':
            case 'complic':
            case 'complica':
            case 'complicat':
            case 'complicate':
            case 'complicated':
                await complicated.defuseComplicated(...args.slice(1));
                break;
            case 'se':
            case 'seq':
            case 'sequ':
            case 'seque':
            case 'sequen':
            case 'sequenc':
            case 'sequence':
                break;
            case 'ma':
            case 'max':
            case 'maze':
                break;
            case 'p':
            case 'pa':
            case 'pas':
            case 'pass':
            case 'passw':
            case 'passwo':
            case 'passwor':
            case 'password':
                break;
            default:
                console.log('    "' + args[0] + '" non è un modulo riconosciuto.');
        }
    } else {
        console.log('Inserisci il modulo da disinnescare. Usa "HELP DEFUSE" per maggiori informazioni.');
    }
};

exports.helpDefuse = helpDefuse;
exports.defuse = defuse;
