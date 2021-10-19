const helpDefuse = (...args) => {
    if (args && args.length) {
        switch (args[1]) {

        }
    } else {
        console.log('defuse è seguito sempre da [modulo] e da [argomenti]. I moduli sono i seguenti:');
        console.log('    WIRES color1 color2 color3 [color4 [color5 [color6]]]');
        console.log('    BUTTON color text');
        console.log('    SYMBOLS symbol1 symbol2 symbol3 symbol4');
        console.log('    COLORS [color1 [...colors]]');
        console.log('    WORDS text');
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

const defuse = {
    wires: require('./defuse.wires').defuseWires
    , button: null
    , symbols: null
    , colors: null
    , words: null
    , memory: null
    , morse: null
    , complicated: null
    , sequence: null
    , maze: null
    , password: null
};

exports.helpDefuse = helpDefuse;
exports.defuse = defuse;
