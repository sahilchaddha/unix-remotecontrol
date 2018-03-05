const request = require('supertest');
const express = require('express');

var routerService = require('./Services/RouterService.js')
var routes = require('./routes.js')

 
var app = express();
 
routerService.addRoutes(app, routes)

request(app)
  .get("/power")
  .set('token', 'f64f2940-fae4-11e7-8c5f-ef356f279131')
  .expect(200)
  .end(function(err, res) {
    if (err) {
        throw err;
    } else {
        console.log("Test 1 Passed")
    }
  });

  request(app)
  .get("/power")
  .expect(400)
  .end(function(err, res) {
    if (err) {
        throw err;
    } else {
        console.log("Test 2 Passed")
    }
  });

  request(app)
  .get("/power/ping")
  .set('token', 'f64f2940-fae4-11e7-8c5f-ef356f279131')
  .expect(200)
  .expect(function(res) {
    res.body.responseMessage = 'Pong';
  })
  .end(function(err, res) {
    if (err) {
        throw err;
    } else {
        console.log("Test 3 Passed")
    }
  });
