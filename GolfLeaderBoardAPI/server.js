// Golf Information Microservice for CS361
// Author: Aylee Shomali
// Notes:
// Please note that I have added duplicate routes with 'dev' suffixes.
// These can be used for testing purposes which send hardcoded JSON in the same structure as what would come from the leaderboard API I am using. 
// Feel free to switch over to the non-dev routes when you would like to test the real-time data. Thank you!

"use strict";

const express = require('express');
const app = express();
const fs = require("fs");
const cors = require("cors");
const { json } = require('express');
const fetch = require('node-fetch');
require('dotenv').config()

 app.use(
    express.urlencoded({
      extended: true,
    })
  );

app.use(cors());

// Route for main page.
app.get('/', function (req, res) {
      res.sendFile( __dirname + "/public/" + "index.html", 'utf8', function (err, data) {
   });
})

// Get top 10 Golfers in PGA Championship.
app.get('/getTopTen', function (req, res) {

   const url = 'https://golf-leaderboard-data.p.rapidapi.com/leaderboard/25';

   const options = {
   method: 'GET',
   headers: {
      'X-RapidAPI-Key': process.env.rapid_api_key,
      'X-RapidAPI-Host': process.env.rapid_api_host
   }};

   fetch(url, options)
	   .then(res => res.json())
	   .then(data => 
         {

            for(let i=10; i< data.results.leaderboard.length; i++){
               delete data.results.leaderboard[i];
            }

            for(let i=0; i< 10; i++){
               delete data.results.leaderboard[i].player_id;
               delete data.results.leaderboard[i].holes_played;
               delete data.results.leaderboard[i].current_round;
               delete data.results.leaderboard[i].status;
               delete data.results.leaderboard[i].strokes;
               delete data.results.leaderboard[i].prize_money;
               delete data.results.leaderboard[i].ranking_points;
               delete data.results.leaderboard[i].total_to_par;
               delete data.results.leaderboard[i].rounds;
            }
            let dataNew = JSON.stringify(data.results.leaderboard)
         
            // Remove extra nulls in JSON string.
            dataNew = dataNew.replaceAll('null,','');
            dataNew = dataNew.replaceAll(',null','');

            res.end(dataNew);
      })
	   .catch(err => console.error('error:' + err));

})

// Get top 10 Golfers in PGA Championship dev route.
app.get('/getTopTenDev', function (req, res) {
   fs.readFile( __dirname + "/" + "leaderboardDataTest.json", 'utf8', function (err, data) {
      data = JSON.parse(data)

      // Remove unneeded players from leaderboard.
      for(let i=10; i< data.results.leaderboard.length; i++){
         delete data.results.leaderboard[i];
      }

      // Remove unneeded properties for each player.
      for(let i=0; i< 10; i++){
         delete data.results.leaderboard[i].player_id;
         delete data.results.leaderboard[i].holes_played;
         delete data.results.leaderboard[i].current_round;
         delete data.results.leaderboard[i].status;
         delete data.results.leaderboard[i].strokes;
         delete data.results.leaderboard[i].prize_money;
         delete data.results.leaderboard[i].ranking_points;
         delete data.results.leaderboard[i].total_to_par;
         delete data.results.leaderboard[i].rounds;
      }
      let dataNew = JSON.stringify(data.results.leaderboard)

      // Remove extra nulls in JSON string.
      dataNew = dataNew.replaceAll('null,','');
      dataNew = dataNew.replaceAll(',null','');

      res.end(dataNew);
   });
})

// Get top ten projected golfers.
app.get('/getTopTenProjected', function (req, res) {

   const url = 'https://golf-leaderboard-data.p.rapidapi.com/projected-rankings-pga/2022';

   const options = {
     method: 'GET',
     headers: {
      'X-RapidAPI-Key': process.env.rapid_api_key,
      'X-RapidAPI-Host': process.env.rapid_api_host
     }
   };

   fetch(url, options)
	   .then(res => res.json())
	   .then(data => 
         {
            // Remove unneeded players from rankings.
            for(let i=10; i< data.results.rankings.length; i++){
               delete data.results.rankings[i];
            }
         
            // Remove unneeded properties for each player.
            for(let i=0; i< 10; i++){
               delete data.results.rankings[i].player_id;
               delete data.results.rankings[i].projected_event_points;
               delete data.results.rankings[i].movement;
               delete data.results.rankings[i].updated_at;
            }
            let dataNew = JSON.stringify(data.results.rankings)
         
            // Remove extra nulls in JSON string.
            dataNew = dataNew.replaceAll('null,','');
            dataNew = dataNew.replaceAll(',null','');
         
            res.end(dataNew);

         }).catch(err => console.error('error:' + err));

})

// Get top ten projected golfers dev route.
app.get('/getTopTenProjectedDev', function (req, res) {
   fs.readFile( __dirname + "/" + "projectedDataTest.json", 'utf8', function (err, data) {
      data = JSON.parse(data)

      // Remove unneeded players from rankings.
      for(let i=10; i< data.results.rankings.length; i++){
         delete data.results.rankings[i];
      }

      // Remove unneeded properties for each player.
      for(let i=0; i< 10; i++){
         delete data.results.rankings[i].player_id;
         delete data.results.rankings[i].projected_event_points;
         delete data.results.rankings[i].movement;
         delete data.results.rankings[i].updated_at;
      }
      let dataNew = JSON.stringify(data.results.rankings)

      // Remove extra nulls in JSON string.
      dataNew = dataNew.replaceAll('null,','');
      dataNew = dataNew.replaceAll(',null','');

      res.end(dataNew);
   });
})

// Return all tours.
app.get('/getAllTours', function (req, res) {

   const url = 'https://golf-leaderboard-data.p.rapidapi.com/tours';

   const options = {
     method: 'GET',
     headers: {
      'X-RapidAPI-Key': process.env.rapid_api_key,
      'X-RapidAPI-Host': process.env.rapid_api_host
     }
   };
   

   fetch(url, options)
	   .then(res => res.json())
	   .then(data => 
         {
            // Remove unneeded properties for each player.
            for(let i=0; i< data.results.length; i++){
               delete data.results[i].tour_id;
            }
         
            let dataNew = JSON.stringify(data.results)
         
            res.end(dataNew);
         }).catch(err => console.error('error:' + err));

})

// Return all tours dev route.
app.get('/getAllToursDev', function (req, res) {
   fs.readFile( __dirname + "/" + "allToursDataTest.json", 'utf8', function (err, data) {

      data = JSON.parse(data)

      // Remove unneeded properties for each player.
      for(let i=0; i< data.results.length; i++){
         delete data.results[i].tour_id;
      }

      let dataNew = JSON.stringify(data.results)

      res.end(dataNew);
   });
})

const server = app.listen(process.env.port, function () {
   const host = server.address().address
   const port = server.address().port
   console.log("App listening at http://%s:%s", host, port)
})