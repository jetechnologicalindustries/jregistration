const express = require('express');
const path = require('path');
const NodeCouchDB = require('node-couchdb')
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const tynt = require('tynt');
const moment = require('moment');
const port = process.env.PORT || 8080;

//db start
const couch = new NodeCouchDB({
	auth: {
		user: 'admin',
		password: 'admin'
	}
});

const dbName = 'jregistration';
const viewUrl = '_design/all_members/_view/all';

console.log('Checking database connection...')
couch.listDatabases().then(function(dbs){
	console.log(dbs);
	console.log('Database connection successful.');
});
//db end

const app = express();

// Init middleware
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));



// Homepage Route
app.get('/', function(req,res){
  couch.get(dbName, viewUrl).then(
  	function(data, headers, status){
  		console.log(
		    `${tynt.Yellow(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))}` + ` : ${tynt.Green('Members data rendered')}`
		  );
  		res.render('index', {
		    title: 'Member App',
		    members: data.data.rows
		  });
  	},
  	function(err){
  		res.send(err);
  	});
});

app.post('/members/add', function(req,res){
	const first = req.body.first;
	const last = req.body.last;
	const city = req.body.city;
	const age = req.body.age;
	const dob = req.body.dob;
	const com = req.body.com;
	const contact = req.body.contact;
	const email = req.body.email;
	const standing = "good";
	const lastpayment = "";
	const dues = "0";

	couch.uniqid().then(function(ids){
		const id = ids[0];

		couch.insert(dbName, {
			_id: id,
			first: first,
			last: last,
			city: city,
			age: age,
			dob: dob,
			com: com,
			contact: contact,
			email: email,
			standing: standing,
			lastpayment: lastpayment,
			dues: dues
		}).then(
			function(data, headers, status){
				console.log(
		    	`${tynt.Yellow(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))}` + ` : ${tynt.Green(first +' '+last+' successfully added')}`
		  		);
				res.redirect('/');
			},
			function(err){
				res.send(err);
		});
	});
});

app.post('/members/delete/:id', function(req, res){
	const id = req.params.id;
	const rev = req.body.rev;

	couch.del(dbName, id, rev).then(
		function(data, headers, status){
			console.log(
		    	`${tynt.Yellow(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))}` + ` : ${tynt.Red('user no. '+id+' removed successfully')}`
		  		);
			res.redirect('/');
		},
		function(err){
			res.send(err);
		});
});

function serverStart() {
	app.listen(port, function(){
		console.log('        ____.______________________                           .__                     ');
		console.log('        |    |\\_   _____/\\__    ___/   ______ ______________  _|__| ____  ____   ______');
		console.log('        |    | |    __)_   |    |     /  ___// __ \\_  __ \\  \\/ /  |/ ___\\/ __ \\ /  ___/');
		console.log('    /\\__|    | |        \\  |    |     \\___ \\\\  ___/|  | \\/\\   /|  \\  \\__\\  ___/ \\___ \\ ');
		console.log('    \\________|/_______  /  |____|    /____  >\\___  >__|    \\_/ |__|\\___  >___  >____  >');
		console.log('                      \\/                  \\/     \\/                    \\/    \\/     \\/ ');
		console.log('  _________                                 __________                    .__                ');
		console.log(' /   _____/ ______________  __ ___________  \\______   \\__ __  ____   ____ |__| ____    ____  ');
		console.log(' \\_____  \\_/ __ \\_  __ \\  \\/ // __ \\_  __ \\  |       _/  |  \\/    \\ /    \\|  |/    \\  / ___\\ ');
		console.log(' /        \\  ___/|  | \\/\\   /\\  ___/|  | \\/  |    |   \\  |  /   |  \\   |  \\  |   |  \\/ /_/  >');
		console.log('/_______  /\\___  >__|    \\_/  \\___  >__|     |____|_  /____/|___|  /___|  /__|___|  /\\___  / ');
		console.log('        \\/     \\/                 \\/                \\/           \\/     \\/        \\//_____/  ');
		console.log(' =================================Server running on ' + port + '===================================')
	}); 
};

setTimeout(serverStart, 1000);