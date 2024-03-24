const mysql = require( 'promise-mysql' );
var jwt = require( 'jsonwebtoken' );

/**
 * @type {mysql.Connection}
 */
var connection = undefined;


module.exports = {

    /**
     * 
     * @param {mysql.Connection} db 
     */
    bindClientDB: function ( db ) {
        if ( db ) {
            connection = db;
        }

    },

    /**
     * 
     * @returns {mysql.Connection}
     */
    getClientDB: function () {
        if ( !connection ) {
            return {
                query: function () {
                    console.error( 'Error: Attempted to query, but there is no connection to database.' )
                }
            };
        } else {
            return connection;
        }

    }
};
