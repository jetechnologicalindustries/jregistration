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

app.listen(port, function(){
	console.log('Server running on ' + port)
}) 