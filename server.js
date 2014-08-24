var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

  url = 'http://www.imdb.com/list/ls052535080/?start=1&view=detail&sort=listorian:asc';

  request(url, function(error, response, html){

    if(!error) {

      var $ = cheerio.load(html);
      var list = [];

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

        console.log(json);
        list.push(json);

      })
    }

    console.log(list);

  })

})

app.listen('8081')

exports = module.exports = app;
