var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var http = require( 'http' );
var sock = require( 'socket.io' );
var morgan = require( 'morgan' );
var fs = require( 'fs' );
var randomstring = require( 'randomstring' )

// *** myadmin Routers ***
var auth = require( './auth/authroutes.js' );
var database = require( './database/databaseroutes.js' );
var settings = require( './settings/settingsroutes.js' );
var system = require( './system/systemroutes.js' );
var home = require( './home/homeroutes.js' );


/**
 * 
 * @param {express.Express} app 
 * @param {number} port 
 * @returns 
 */
module.exports = function myadmin( app, port ) {
    'use strict';

    // ** Socket Connection
    var server = http.createServer( app );
    var io = sock( server );

    var expressListen = app.listen;
    app.listen = server.listen.bind( server );

    // ** Socket Controller
    require( './sockets/socketcontroller.js' )( io );

    // ** Logs
    var accessLogStream = fs.createWriteStream( __dirname + '/serverlogs/access.log', {
        flags: 'a'
    } );

    // ** Third party middleware
    app.use( morgan( 'dev', { stream: accessLogStream } ) );

    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded( { extended: true } ) );

    app.use( '/myadmin', express.static( __dirname + '/public' ) );

    // creates secret.js with a random string if it hasn't been initialized\\
    fs.readFile( './secret.js', function ( err, data ) {
        if ( err.code === 'ENOENT' ) {
            var randomString = randomstring.generate();
            var contents = "module.exports = '" + randomString + "';";
            fs.writeFileSync( __dirname + '/secret.js', contents );
        }
        var secret = require( './secret.js' );
        app.locals.secret = secret;
    } );

    // ** Routes
    app.use( '/myadmin/api/auth',       auth );
    app.use( '/myadmin/api/db',         database );
    app.use( '/myadmin/api/settings',   settings );
    app.use( '/myadmin/api/system',     system );
    app.use( '/myadmin/api/home',       home );

    // ** Middleware
    /**
     * 
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    return function myadmin( req, res, next ) {
        next();
    };

};
