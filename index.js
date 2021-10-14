const READLINE = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let exit = false;

let bomb = {
    car: false
    , frk: false
    , batteries: 0
    , parallel: false
    , serial: {
        lastDigit: 0
        , vowel: false
    }
};

const exitFn = () => {
    exit = true;
    READLINE.on('Grazie per aver usato il keep-writing-bot.', () => {
        READLINE.close();
    });
}

const inputListener = (input) => {
    if (typeof input === 'string') {
        while (input.includes('  ')) {
            input.replace('  ', ' ');
        }
        const splitted = input.trim().split(' ');
        switch (splitted[0]) {
            case 'defuse':
                break;
            case 'bomb':
                break;
            case 'exit':
                exitFn();
                break;
            case 'help':
            default:
        }
    }

    if (!exit) {
        READLINE.question('Command: ', (_input) => {
            inputListener(_input);
        });
    }
};

inputListener('');
