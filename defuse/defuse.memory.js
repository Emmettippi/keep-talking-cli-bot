const readline = require('../reader').readline;

const helpDefuseMemory = () => {
    console.log('    DEFUSE MEMORY');
    console.log('    Per ogni stage inserisci la sequenza numerica dtttt (d = "display", t = "testo pulsante").');
    console.log('');
};

const SOLUTIONS = {
    '1': {
        '1': { position: 2 }
        , '2': { position: 2 }
        , '3': { position: 3 }
        , '4': { position: 4 }
    }
    , '2': {
        '1': { text: '4' }
        , '2': { positionStage: 1 }
        , '3': { position: 1 }
        , '4': { positionStage: 1 }
    }
    , '3': {
        '1': { textStage: 2 }
        , '2': { textStage: 1 }
        , '3': { position: 3 }
        , '4': { text: '4' }
    }
    , '4': {
        '1': { positionStage: 1 }
        , '2': { position: 1 }
        , '3': { positionStage: 2 }
        , '4': { positionStage: 2 }
    }
    , '5': {
        '1': { textStage: 1 }
        , '2': { textStage: 2 }
        , '3': { textStage: 4 }
        , '4': { textStage: 3 }
    }
};

let stages = [];

const stage = (currentStage = 1) => {
    return new Promise(resolve => {
        readline.question('  Stage ' + currentStage + ': ', async (input) => {
            if (!input || input.length !== 5 || !input.match('[1-4][1-4][1-4][1-4][1-4]')) {
                console.log('    "' + input + '" non rispetta la sintassi "dtttt".');
                await stage(currentStage);
                resolve();
            } else {
                const solution = SOLUTIONS[currentStage.toString()][input.charAt(0)];
                const _stage = {
                    memory: input
                    , position: null
                    , solution: null
                };

                if (solution['position']) {
                    _stage.position = solution['position'];
                    _stage.solution = input.charAt(solution['position']);

                } else if (solution['text']) {
                    _stage.position = input.substring(1).indexOf(solution['text']) + 1;
                    _stage.solution = solution['text'];

                } else if (solution['positionStage']) {
                    const old = stages[solution['positionStage'] - 1];
                    _stage.position = old.position;
                    _stage.solution = input.charAt(old.position);

                } else if (solution['textStage']) {
                    const old = stages[solution['textStage'] - 1];
                    _stage.position = input.substring(1).indexOf(old.solution) + 1;
                    _stage.solution = old.solution;
                }

                stages.push(_stage);
                console.log('    Premi: ' + _stage.solution);
                if (currentStage < 5) {
                    await stage(currentStage + 1);
                }
                resolve();
            }
        });
    });
}

const defuseMemory = async (...args) => {
    stages = [];
    await stage();
};

exports.helpDefuseMemory = helpDefuseMemory;
exports.defuseMemory = defuseMemory;
