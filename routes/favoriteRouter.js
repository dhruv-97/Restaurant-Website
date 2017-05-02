var express = require('express');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorite');
var Verify=require('./verify');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.get(function (req, res, next) {
    Favorites.findOne({})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorite) {
        if (err) next(err);
        res.json(favorite);
    });
})

.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    Favorites.findOne({}, function (err, favorite) {
        if (err) next(err);
        if(favorite==null){
            Favorites.create({"dishes":[req.body._id],"postedBy":req.decoded._doc._id}, function (err, favorite) {
            if (err) next(err);
            console.log('Favorite created!');
            var id = favorite._id;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });

            res.end('Added the favorite with id: ' + id);
        });
        }
        else{
        favorite.dishes.push(req.body._id);
        favorite.save(function (err, favorite) {
            if (err) next(err);
            console.log('Updated favorites!');
            res.json(favorite);
        });
    }
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Favorites.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

favoriteRouter.route('/:favoriteId')
.get(function (req, res, next) {
    Favorites.findOne({})
        .populate('dishes')
        .exec(function (err, favorite) {
        if (err) next(err);
        res.json(favorite.dishes);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Favorites.findByIdAndUpdate(req.params.favoriteId, {
        $set: req.body
    }, {
        new: true
    }, function (err, favorite) {
        if (err) next(err);
        res.json(favorite);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Favorites.findOne({}, function (err, favorite) {
            for(var i=0; i<favorite.dishes.length; i++){
                if(favorite.dishes[i]==req.params.favoriteId){
                    favorite.dishes.splice(i,1);
                    favorite.save(function (err, favorite) {
                        if (err) next(err);
                        console.log('Updated favorites!');
                        res.json(favorite);
                    });
                }
            }
        });
});
module.exports = favoriteRouter;