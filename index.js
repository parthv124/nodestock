// code by parth
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));


function call_api(finishedapi, ticker){
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_bd9e39af7d08412cbf21ba0d20b39f49', { json: true}, (err, res, body) => {
if(err){return console.log(err);}
if(res.statusCode === 200){
    //console.log(body);
     finishedapi(body);
};
});
}

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
	 call_api(function(doneapi){
	 	res.render('home',{
    	stock: doneapi
    });
	 },"fb");
});


app.post('/', function (req, res) {
	 call_api(function(doneapi){
	 	//p_s = req.body.stock_ticker;
	 	res.render('home',{
    	stock: doneapi
    });
	 }, req.body.stock_ticker);
});

app.get('/about.html', function (req, res) {
    res.render('about');
});

app.use(express.static(path.join(__dirname,'public')))

app.listen(PORT, () => console.log('Server listening on port '+ PORT));
