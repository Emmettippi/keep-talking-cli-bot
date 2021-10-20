const readline = require('./reader').readline;

const defuse = require('./defuse/defuse');
const help = require('./help');
const bomb = require('./bomb');
bomb.reset(false);

let exit = false;

const exitFn = () => {
    exit = true;
    readline.close();
}

const inputListener = async (input) => {
    if (typeof input === 'string') {
        while (input.includes('  ')) {
            input = input.replace('  ', ' ');
        }
        const splitted = input.trim().toLowerCase().split(' ');
        switch (splitted[0]) {
            case '':
                break;
            case 'd':
            case 'de':
            case 'def':
            case 'defu':
            case 'defus':
            case 'defuse':
                await defuse.defuse(...splitted.slice(1));
                break;
            case 'b':
            case 'bo':
            case 'bom':
            case 'bomb':
                await bomb.command(...splitted.slice(1));
                break;
            case 'h':
            case 'he':
            case 'hel':
            case 'help':
                help.help(...splitted.slice(1));
                break;
            case 'q':
            case 'qu':
            case 'qui':
            case 'quit':
            case 'd':
            case 'do':
            case 'don':
            case 'done':
            case 'e':
            case 'ex':
            case 'exi':
            case 'exit':
                exitFn();
                break;
            default:
                console.log('    "' + splitted[0] + '" non è un comando riconosciuto.');
        }
    }

    if (!exit) {
        readline.question('Command: ', (_input) => {
            inputListener(_input);
        });
    }
};

inputListener('');
