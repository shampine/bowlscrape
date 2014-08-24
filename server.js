var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

  var url = [
    'http://www.imdb.com/list/ls052535080/?start=1&view=detail&sort=listorian:asc',
    'http://www.imdb.com/list/ls052535080/?start=101&view=detail&sort=listorian:asc',
    'http://www.imdb.com/list/ls052535080/?start=201&view=detail&sort=listorian:asc',
    'http://www.imdb.com/list/ls052535080/?start=301&view=detail&sort=listorian:asc',
    'http://www.imdb.com/list/ls052535080/?start=401&view=detail&sort=listorian:asc',
    'http://www.imdb.com/list/ls052535080/?start=501&view=detail&sort=listorian:asc',
    'http://www.imdb.com/list/ls052535080/?start=601&view=detail&sort=listorian:asc',
    'http://www.imdb.com/list/ls052535080/?start=701&view=detail&sort=listorian:asc',
    'http://www.imdb.com/list/ls052535080/?start=801&view=detail&sort=listorian:asc',
    'http://www.imdb.com/list/ls052535080/?start=901&view=detail&sort=listorian:asc',
    'http://www.imdb.com/list/ls052535080/?start=1001&view=detail&sort=listorian:asc'
  ];

  var list = [];

  for(var i=0; i < url.length; i++) {

    request(url[i], function(error, response, html) {

      if(!error) {

        var $ = cheerio.load(html);

        $('.list_item').each(function(index) {

          var data = $(this);
          var title, year, rating, description, url;
          var json = {};

          title = data.find('b a').text();
          year = data.find('b span').text();
          rating = data.find('.rating-rating .value').text();
          description = data.find('.item_description').text();
          url = data.find('b a').attr('href');

          json.title = title;
          json.year = year;
          json.rating = rating;
          json.description = description;
          json.url = url;
 
          list.push(json);

        });

      }

      fs.writeFile('list.json', JSON.stringify(list, null, 4), function(err){

        console.log('Succesfully wrote to file, see list.json.');

      });

    });

  }

});

app.listen('8081')

exports = module.exports = app;
