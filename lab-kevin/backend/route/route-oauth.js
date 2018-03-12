'use strict';
const superagent = require('superagent');
const bodyParser = require('body-parser').json();
const Auth = require('../model/auth');

const errorHandler = require('../lib/error-handler');
const debug  = require('debug')('http:route-gallery');
require('dotenv').config();

const GOOGLE_OAUTH_URL = 'https://www.googleapis.com/oauth2/v4/token';
const OPEN_ID_URL = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

debug('oauth');

module.exports = function(router) {

  router.route('/oauth/google/code')

    .get(bodyParser, (req, res) => {
      if(!req.query.code) return res.redirect(process.env.CLIENT_URL);
      
      return superagent.post(GOOGLE_OAUTH_URL)
        .type('form')
        .send({
          code: req.query.code,
          grant_type: 'authorization_code',
          client_id: process.env.GOOGLE_OAUTH_ID,
          client_secret: process.env.GOOGLE_OAUTH_SECRET,
          redirect_uri: `${process.env.API_URL}/oauth/google/code`,
        })
        .then(tokenRes => {
          let token = tokenRes.body.access_token;
          return superagent.get(OPEN_ID_URL)
            .set('Authorization', `Bearer ${token}`)
            .then(openIdRes => {
              let user_profile = openIdRes.body;
              debug('user profile', user_profile);
              //res.cookie()
              res.redirect(process.env.CLIENT_URL);
            })
            .catch(err =>{
              debug('SERVER ERROR', err);
              //res.cookie(//empty)
              res.redirect(`${process.env.CLIENT_URL}?error=oauth`);
            });
            
        });


    })
    .catch(err => errorHandler(err, res));

};