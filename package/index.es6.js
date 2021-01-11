// install and run WASM module
export const run = function ( wasmURL ) {

    // create Go instance
    const go = new Go();

    // fetch WASM module file
    return fetch( wasmURL )
    .then( response => response.arrayBuffer() )
    .then( bytes => WebAssembly.instantiate( bytes, go.importObject ) )
    .then( ( { instance } ) => {
        go.run( instance ); // run Go WASM module
    } );
    
};