var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

  url = 'http://www.imdb.com/list/ls052535080/?start=1&view=detail&sort=listorian:asc';

  request(url, function(error, response, html){

    if(!error) {

      var $= cheerio.load(html);
      var title, year, rating, rank, url;
      var json = { title : "", year : "", rating : "", rank : "", url : ""};

    }
  })

})

app.listen('8081')

exports = module.exports = app;
