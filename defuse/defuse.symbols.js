const helpDefuseSymbols = () => {
    console.log('    DEFUSE SYMBOLS symbol symbol symbol symbol');
    console.log('    "defuse symbols" acetta esattamente 4 simboli tra i seguenti:');
    console.log('        AT   X    LAMBDA    FULMINE   ALIENO    PALLONCINO');
    console.log('        CROVESCIA EURO      DISNEY    DOMANDA   BIANCASTELLA');
    console.log('        COPYRIGHT CULO      DOPPIAK   R    6    CDRITTA');
    console.log('        ACAPO     PROVESCIA FACCINA   PSI       NERASTELLA');
    console.log('        SERPENTE  PUZZLE    AE        OMEGA     N');
    console.log('');
    console.log('    È possibile troncare i nomi dei simboli, senza cadere in .');
    console.log('');
}

const symbolLists = [
    ['palloncino', 'at', 'lambda', 'fulmine', 'alieno', 'x', 'crovescia']
    , ['euro', 'palloncino', 'crovescia', 'disney', 'biancastella', 'x', 'domanda']
    , ['copyright', 'culo', 'disney', 'doppiak', 'r', 'lambda', 'biancastella']
    , ['6', 'acapo', 'provescia', 'alieno', 'doppiak', 'domanda', 'faccina']
    , ['psi', 'faccina', 'provescia', 'cdritta', 'acapo', 'serpente', 'nerastella']
    , ['6', 'euro', 'puzzle', 'ae', 'psi', 'n', 'omega']
];

const defuseSymbols = (...args) => {
    if (!args || args.length !== 4) {
        console.log('    DEFUSE SYMBOLS accetta esattamente 4 simboli.');
        return;
    }
    const symbols = [];
    let errors = false;
    for (const arg of args) {
        switch (arg) {
            case '6':
                symbols.push('6');
                break;
            case 'ac':
            case 'aca':
            case 'acap':
            case 'acapo':
                symbols.push('acapo');
                break;
            case 'ae':
                symbols.push('ae');
                break;
            case 'al':
            case 'ali':
            case 'alie':
            case 'alien':
            case 'alieno':
                symbols.push('alieno');
                break;
            case 'at':
                symbols.push('at');
                break;
            case 'b':
            case 'bi':
            case 'bia':
            case 'bian':
            case 'bianc':
            case 'bianca':
            case 'biancas':
            case 'biancast':
            case 'biancaste':
            case 'biancastel':
            case 'biancastell':
            case 'biancastella':
                symbols.push('biancastella');
                break;
            case 'cd':
            case 'cdr':
            case 'cdri':
            case 'cdrit':
            case 'cdritt':
            case 'cdritta':
                symbols.push('cdritta');
                break;
            case 'co':
            case 'cop':
            case 'copy':
            case 'copyr':
            case 'copyri':
            case 'copyrig':
            case 'copyrigh':
            case 'copyright':
                symbols.push('copyright');
                break;
            case 'cr':
            case 'cro':
            case 'crov':
            case 'crove':
            case 'croves':
            case 'crovesc':
            case 'crovesci':
            case 'crovescia':
                symbols.push('crovescia');
                break;
            case 'cu':
            case 'cul':
            case 'culo':
                symbols.push('culo');
                break;
            case 'di':
            case 'dis':
            case 'disn':
            case 'disne':
            case 'disney':
                symbols.push('disney');
                break;
            case 'dom':
            case 'doma':
            case 'doman':
            case 'domand':
            case 'domanda':
                symbols.push('domanda');
                break;
            case 'dop':
            case 'dopp':
            case 'doppi':
            case 'doppia':
            case 'doppiak':
                symbols.push('doppiak');
                break;
            case 'e':
            case 'eu':
            case 'eur':
            case 'euro':
                symbols.push('euro');
                break;
            case 'fa':
            case 'fac':
            case 'facc':
            case 'facci':
            case 'faccin':
            case 'faccina':
                symbols.push('faccina');
                break;
            case 'fu':
            case 'ful':
            case 'fulm':
            case 'fulmi':
            case 'fulmin':
            case 'fulmine':
                symbols.push('fulmine');
                break;
            case 'l':
            case 'la':
            case 'lam':
            case 'lamb':
            case 'lambd':
            case 'lambda':
                symbols.push('lambda');
                break;
            case 'n':
                symbols.push('n');
                break;
            case 'ne':
            case 'ner':
            case 'nera':
            case 'neras':
            case 'nerast':
            case 'neraste':
            case 'nerastel':
            case 'nerastell':
            case 'nerastella':
                symbols.push('nerastella');
                break;
            case 'o':
            case 'om':
            case 'ome':
            case 'omeg':
            case 'omega':
                symbols.push('omega');
                break;
            case 'pa':
            case 'pal':
            case 'pall':
            case 'pallo':
            case 'pallon':
            case 'pallonc':
            case 'pallonci':
            case 'palloncin':
            case 'palloncino':
                symbols.push('palloncino');
                break;
            case 'pr':
            case 'pro':
            case 'prov':
            case 'prove':
            case 'proves':
            case 'provesc':
            case 'provesci':
            case 'provescia':
                symbols.push('provescia');
                break;
            case 'ps':
            case 'psi':
                symbols.push('psi');
                break;
            case 'pu':
            case 'puz':
            case 'puzz':
            case 'puzzl':
            case 'puzzle':
                symbols.push('puzzle');
                break;
            case 'r':
                symbols.push('r');
                break;
            case 's':
            case 'se':
            case 'ser':
            case 'serp':
            case 'serpe':
            case 'serpen':
            case 'serpent':
            case 'serpente':
                symbols.push('serpente');
                break;
            case 'x':
                symbols.push('x');
                break;
            default:
                errors = true;
                console.log('    Nessun simbolo corrisponde al comando "' + arg + '".');
        }
    }
    if (errors) {
        return;
    }
    const output = [];
    for (const list of symbolLists) {
        let correctList = true;
        for (const sym of symbols) {
            if (!list.includes(sym)) {
                correctList = false;
                break;
            }
        }

        if (correctList) {
            for (const defaultSymbol of list) {
                if (symbols.includes(defaultSymbol)) {
                    output.push(defaultSymbol);
                }
            }
            break;
        }
    }

    console.log('    L\'ordine è: ' + output[0] + ', ' + output[1]
        + ', ' + output[2] + ', ' + output[3] + '.');
}

exports.helpDefuseSymbols = helpDefuseSymbols;
exports.defuseSymbols = defuseSymbols;
