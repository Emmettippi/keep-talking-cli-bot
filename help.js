const helpDefuse = require('./defuse/defuse').helpDefuse;
const helpBomb = require('./bomb').helpBomb;

const help = (...args) => {
    if (args && args.length) {
        switch (args[0]) {
            case 'defuse':
                helpDefuse(...args.slice(1));
                break;
            case 'bomb':
                helpBomb(...args.slice(1));
                break;
            case 'quit':
            case 'exit':
            case 'done':
                console.log('    Esci.');
                break;
            case 'help':
                console.log('    Digita "HELP command" per ricevere dei dettagli sul comando.');
                break;
            default:
                console.log('    Non sono disponibili suggerimenti per il comando "' + args[0] + '".')
        }
    } else {
        console.log('Lista dei comandi disponibili:');
        console.log('    DEFUSE modulo [+...]');
        console.log('    BOMB [check|reset]');
        console.log('    QUIT|EXIT|DONE');
        console.log('    HELP [+command]');
        console.log('');
        console.log('    È possibile troncare i comandi. Es: è possibile abbreviare "defuse" con "def".');
        console.log('');
    }
}

exports.help = help;
