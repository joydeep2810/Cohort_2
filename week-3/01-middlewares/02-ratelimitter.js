const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};

//This is the clock that refresh the count to 0 or (empty the object) after 1 sec
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

function rate(req,res,next){
  //first taking the uder id of user
  const usersId =req.headers["user-id"]
  
  //First we check the object is undefined or not if undefined then start the count to 1
  //then increasing the count on every time the request is getting called within 1 sec (cause if 1 sec completes the count will go to 0)
  //after increasing the count checking if it is more than 5 or not
  //if more than 5 then blocks the user and send 404 and if less then user then else condition allow 
  if(numberOfRequestsForUser[usersId]){                          
    numberOfRequestsForUser[usersId] = numberOfRequestsForUser[usersId] +1
    if(numberOfRequestsForUser[usersId]>5){
      res.status(404).send("no entry")
    }else{
      next()
    }
  }else{
    numberOfRequestsForUser[usersId]=1
    next()
  }
}

app.use(rate)

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;