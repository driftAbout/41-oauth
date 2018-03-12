'use strict';

const bodyParser = require('body-parser').json();
const Gallery = require('../model/gallery');
const bearer_auth_middleware = require('../lib/bear-auth-middleware');
const errorHandler = require('../lib/error-handler');
const debug  = require('debug')('http:route-gallery');

module.exports = function(router) {

  debug('route_gallery');

  router.route('/gallery/:id?')

    .post(bearer_auth_middleware, bodyParser, (req, res) => {
      req.body.user_id = req.user._id;
      return new Gallery(req.body).save()
        .then(gallery => res.status(201).json(gallery))
        .catch(err => errorHandler(err, res));
    })

    .get(bearer_auth_middleware, (req, res) => {
      if(req.params.id){
        return Gallery.findById(req.params.id)
          .then(gallery => {
            if(!gallery) return Promise.reject(new Error('Error ENOENT: Not Found'));
            if (gallery.user_id.toString() !== req.user._id.toString()) return Promise.reject(new Error('Authorization Failed: permission denied'));
            return gallery;
          })
          .then(gallery => res.status(200).json(gallery))
          .catch(err => errorHandler(err, res));
      }
      debug(' req.user._id',  req.user._id, 'req.params.id', req.params.id);
      return Gallery.find({
        user_id: req.user._id,
      })
        .then(galleries => {
          if(!galleries.length) return Promise.reject(new Error('Bad request'));
          res.status(200).json(galleries.map(gallery => gallery._id));
        })
        .catch(err => errorHandler(err, res));
    })

    .put(bearer_auth_middleware, bodyParser, (req, res) => {
      return Gallery.findOne({
        user_id: req.user._id,
        _id: req.params.id,
      })
        .then(gallery => {
          if(!gallery) return Promise.reject(new Error('Error ENOENT: Not Found'));
          if (!req.body.title && !req.body.description) return Promise.reject(new Error('Validation Error: invalid update'));
          let newData = {
            title: req.body.title || gallery.title,
            description: req.body.description || gallery.description,
          };
          return gallery.set(newData).save();
        })
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));
    })

    .delete(bearer_auth_middleware, (req, res) => {
      // return Gallery.findOne({
      //   user_id: req.user._id,
      //   _id: req.params.id,
      // })
      return Gallery.findOne({
        _id: req.params.id,
      })
        .then(gallery => {
          if(!gallery) return Promise.reject(new Error('Error ENOENT: Not Found'));
          if (gallery.user_id.toString() !== req.user._id.toString() ) return Promise.reject(new Error('Authorization Failed: permission denied'));
          debug('gallery', gallery);
          return gallery.remove()
            .then(() => res.sendStatus(204));
        })
        .catch(err => errorHandler(err, res));
    });

};