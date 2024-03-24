const express = require( 'express' ) ;
const jwt = require( 'jsonwebtoken' ) ;


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const tokenCheck = function ( req, res, next ) {
    'use strict';
    var token = req.body.token || req.query.token || req.headers.authorization;
    if ( token ) {
        jwt.verify( token, req.app.locals.secret, function ( err, decoded ) {
            if ( err ) {
                res.status( 403 ).json( {
                    error: err
                } );
            }
            next();
        } );
    }
};

module.exports = tokenCheck;
