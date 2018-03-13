'use strict';
const superagent = require('superagent');
const bodyParser = require('body-parser').json();
const Auth = require('../model/auth');

const errorHandler = require('../lib/error-handler');
const debug  = require('debug')('http:route-oauth');
require('dotenv').config();

const GOOGLE_OAUTH_URL = 'https://www.googleapis.com/oauth2/v4/token';
const OPEN_ID_URL = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

debug('oauth');

module.exports = function(router) {

  router.route('/oauth/google/code')

    .get(bodyParser, (req, res) => {
      if(!req.query.code) return res.redirect(process.env.CLIENT_URL);
      debug('req.query.code', req.query.code);
      return superagent.post(GOOGLE_OAUTH_URL)
        .type('form')
        .send({
          code: req.query.code,
          grant_type: 'authorization_code',
          client_id: process.env.GOOGLE_OAUTH_ID,
          client_secret: process.env.GOOGLE_OAUTH_SECRET,
          redirect_uri: `${process.env.API_URL}/api/v1/oauth/google/code`,
        })
        .then(tokenRes => {
          let token = tokenRes.body.access_token;
          debug('token', token);
          return superagent.get(OPEN_ID_URL)
            .set('Authorization', `Bearer ${token}`)
            .then(openIdRes => {
              let user_profile = openIdRes.body;
              debug('user profile', user_profile);
              let user_data = {
                username: user_profile.name,
                email: user_profile.email,
              };
              Auth.findOne({username: user_data.username})
                .then(user => {
                  if(!user){
                    user = new Auth(user_data);
                  }
                  return user.createToken(); })
                .then(jwt => {
                  debug('jwt', jwt);
                  res.cookie('X-kevin-401d21-app-OAuth-Token', jwt);
                  res.redirect(`${process.env.CLIENT_URL}/dashboard`);
                })
                .catch(err => errorHandler(err,res));
            })
            .catch(err =>{
              debug('SERVER ERROR', err);
              res.cookie('X-kevin-401d21-app-OAuth-Token', '');
              res.redirect(`${process.env.CLIENT_URL}?error=oauth`);
            }); 
        });
    });

};