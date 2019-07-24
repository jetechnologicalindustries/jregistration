const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDB = require('node-couchdb')
const port = '8080';

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


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res){
	couch.get(dbName, viewUrl).then(
		function(data, headers, status){
			console.log(data.data.rows);
			res.render('index',{
				jregistration:data.data.rows
			});
		},
		function(err){
			res.send(err);
		}
	);
});

app.post('/members/add', function(req,res){
	const first = req.body.first;
	const last = req.body.last;
	const city = req.body.city;
	const age = req.body.age;


	couch.uniqid().then(function(ids){
		const id = ids[0];

		couch.insert(dbName, {
			_id: id,
			first: first,
			last: last,
			city: city,
			age: age
		}).then(
			function(data, headers, status){
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