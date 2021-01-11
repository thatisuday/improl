// run Improl WASM module
Improl.run( './improl.wasm' ).then( ( result ) => {
    console.log( '[Improl] WASM module successfully installed.' );

    // add click listener
    document.getElementById( 'getImageBtn' ).addEventListener( 'click', function() {
        fetch( "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fG1vZGVsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" ).then( response => {
            response.arrayBuffer().then( ( buff ) => {
                console.log( "image data =>", window.getImage( new Uint8Array(buff) ) );
                console.log( 'result', _result );
            } );
    
        } )
    } );
} )
.catch( ( err ) => {
    console.error( '[Improl] Failed to install WASM module.', err );
} );
