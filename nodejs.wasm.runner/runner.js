let pathToWasm = '';
if (process.argv.length < 3) {
    console.log('\n\nNeed Path To WASM\n\n');
    return;
}
pathToWasm = process.argv[2];

let funcName;
if (process.argv.length > 3) {
    funcName = process.argv[3];
}

let varA;
let varB;
if (process.argv.length > 4) { varA = process.argv[4]; }
if (process.argv.length > 5) { varB = process.argv[5]; }

const fs = require('fs');
const wasmBuffer = fs.readFileSync(pathToWasm);

WebAssembly.instantiate(wasmBuffer)
    .then(wasmModule => {
        console.log('\nWASM Module:\n');
        console.log(wasmModule);

        console.log('\nWASM Module Instance Exports:\n');
        console.log(wasmModule.instance.exports);

        if (funcName) {
            const func = wasmModule.instance.exports[funcName];
            console.log('Running function ', funcName, ' w no params.');
            const result = func();
            console.log('Result: ', result);

            if (varA) {
                const func = wasmModule.instance.exports[funcName];
                console.log('Running function ', funcName, ' w param varA (', varA, ').');
                const result = func(varA);
                console.log('Result: ', result);
            }
            if (varA && varB) {
                const func = wasmModule.instance.exports[funcName];
                console.log('Running function ', funcName, ' w param varA(', varA, ') and varB(', varB, ').');
                const result = func(varA, varB);
                console.log('Result: ', result);
            }
        }
    })
    .catch(err => {
        console.log('\n\nThere was an error:\n\n', err, '\n\n');
    });
