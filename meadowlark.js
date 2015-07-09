// project entry point i.e. app file
var _ = require('lodash');
var express = require('express');
var jade = require('jade');

// setup handlebars view engine
//var handlebars = require('express-handlebars').create({defaultLayout:'main' });

//app.engine('handlebars',handlebars.engine);

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know",
    "You will have a pleasant suprise.",
    "Whenever possible, keep it simple"
];

var app = express();

app.set('port',process.env.PORT || 3000);

app.set('view engine','jade');
app.locals.pretty = true;


app.get('/', function (req, res) {
    res.render('home');

});

app.get('/about', function (req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() *
            fortunes.length)];
    res.render('about', {fortune: randomFortune});
});

// custom 404 page
app.use(function (req,res) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function (err, req, res, next) {
    console.error( err.stack );

    res.status(500);
    res.render('500');
});

app.listen( app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') +
    '; press Ctrl-C to terminate....');
});

