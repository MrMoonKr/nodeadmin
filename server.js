/////////////////////////////////////////////////////////////////////
// moudles
/////////////////////////////////////////////////////////////////////

const express       = require( 'express' );
const mysql         = require( 'mysql' );
const nodeadmin     = require( __dirname + '/middleware/index.js' );

const app           = express();


/////////////////////////////////////////////////////////////////////
// middleware
/////////////////////////////////////////////////////////////////////

app.use( nodeadmin( app, process.env.PORT || 4040 ) );

app.use( '/', function ( req, res, next ) {

    res.send( '<h1>HELLO WORLD</h1>' );

} );


/////////////////////////////////////////////////////////////////////
// test server
/////////////////////////////////////////////////////////////////////

app.listen( process.env.PORT || 4040 , () => {

    console.log( `[정보] 실행환경 : ${ app.get('env') } 모드` ) ;
    console.log( `[정보] 종료하려면 Ctrl + C 누르세요` ) ;

    console.log( `[정보] 메인페이지 : http://localhost:${ process.env.PORT || 4040 }` ) ;
    console.log( `[정보] 관리페이지 : http://localhost:${ process.env.PORT || 4040 }/myadmin` ) ;

} );

module.exports = app;
