var express = require('express');
var router = express.Router();
var request = require('request');
var tripModel = require('../models/trips');

////////////* Login *////////////
router.get('/', function(req, res, next) {
  req.session.user = null;
  res.render('login');
});
////////////* Inscription *////////////
router.get('/inscription', function (req, res, next) {
  res.render('signup');
});
////////////* Mes voyages *////////////
router.get('/home', function (req, res, next) {
  
    tripModel.find(
      function (err, trips) {
        res.render('index', { trips: trips, user: req.session.user });
  
});
});

////////////* AJouter un voyage *////////////
router.get('/add-trip', function (req, res, next) {
  res.render('add-trip');
});
////////////* Trip détail *////////////
router.get('/trip', function (req, res, next) {
  tripModel.find({ _id: req.query.id },
      function (err, trip) { 
        console.log(req.query.id);
        res.render('trip', {trips: trip, user: req.session.user });
      });
});
////////////* Comptes avec les trips *////////////
router.get('/trips', function (req, res, next) {
  if (!req.session.user) {
    res.redirect('/trips');
  } else {
  tripModel.find(
    function (err, trips) {
      res.render('trips', { trips: trips, user : req.session.user });
    }
  );
  }
});

////////////* Ajouter un trip *////////////
router.post('/new-trip', function (req, res, next) {
      //////////////////////// Enregistre un document 1. préparation des données
      var newtrip = new tripModel({
        img: "/images/trips/paris.jpg",
        name: req.body.tripName,
        desc: req.body.description,
        depart: req.body.depart,
        arrivee: req.body.arrivee,
        date: req.body.date,
      });

      //////////////////////// Ecrire la données
      newtrip.save( function (error, trips) {
        tripModel.find(
        function (err, trips) {
              console.log(trips);
            res.render('trips', { trips : trips, user: req.session.user });
            }
          );
          
        }
      );
   

  });
 

/* Supprimer une trip */
router.get('/delete-trip', function (req, res, next) {
  
  tripModel.deleteOne({ _id: req.query.id },
      function (error) {
        tripModel.find(
          function (err, trips) {
            console.log(trips);
            res.render('trips', { trips: trips, user: req.session.user });
          }
        );
      }
    );

});

module.exports = router;
