const express = require('express');
const path = require('path');
const NodeCouchDB = require('node-couchdb')
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const tynt = require('tynt');
const moment = require('moment');
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: '.jets'
});
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

//timestamper
function timeStampG(text){
	console.log(`${tynt.Yellow(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))}` + ` : ${tynt.Green(text)}`);
};

function timeStampR(text){
	console.log(`${tynt.Yellow(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))}` + ` : ${tynt.Red(text)}`);
};

// app.get('/favicon.ico', (req, res) => res.status(204));
// app.get('/css/style/css', (req, res) => res.status(204));

//
app.use(express.static(path.join(__dirname, '/public')));

// Init middleware
app.use('/jregistration', logger);

// Handlebars Middleware
app.engine('.jets', hbs.engine);
app.set('view engine', '.jets');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//homepage route
app.get('/', function(req,res){
	res.render('index', { 
		alertMsg: undefined,
		title: 'JET Services Homepage',
		titleurl: '/',
		navtitle: 'JET Services',
		link1: 1,
		link1url: '/',
  		link1name: 'Home',
  		link2: 1,
		link2url: '/jregistration',
		link2name: 'JRegistration',
	});
});

//jregistration Route
app.get('/jregistration', function(req,res){
	res.render('jregistrationPage', { 
  		alertMsg: undefined,
  		title: 'JRegistration Homepage',
  		titleurl: '/jregistration',
  		navtitle: 'JRegistration',
  		link1: 1,
  		link1url: '/jregistration',
  		link1name: 'Home',
  		link2: 1,
		link2url: '/jregistration/members',
		link2name: 'Members',
		link3: 1,
		link3url: '/jregistration/members/new',
		link3name: 'New',
		link8: 1,
		link8url: '/',
		link8name: 'JET Services'
	});
});

app.all('/jregistration/members', function(req,res){
  couch.get(dbName, viewUrl).then(
  	function(data, headers, status){
  		let text='Members data rendered';
  		timeStampG(text);
  		res.render('membersPage', {
  			alertMsg: undefined || req.body.redirectMsg,
  			alerttype: undefined || req.body.redirecttype,
  			title: 'Members Page',
  			titleurl: '/jregistration',
  			navtitle: 'JRegistration',
  			link1: 1,
  			link1url: '/jregistration',
  			link1name: 'Home',
  			link2: 1,
			link2url: '/jregistration/members',
			link2name: 'Members',
			link3: 1,
			link3url: '/jregistration/members/new',
			link3name: 'New',
			link8: 1,
			link8url: '/',
			link8name: 'JET Services',
		    members: data.data.rows
		  });
  	},
  	function(err){
  		let text='Cannot connect to database';
  		timeStampR(err);
  		res.render('jregistrationPage', { 
		  		alertMsg: text,
		  		title: 'JRegistration Homepage',
		  		titleurl: '/jregistration',
		  		navtitle: 'JRegistration',
		  		link1: 1,
		  		link1url: '/jregistration',
		  		link1name: 'Home',
		  		link2: 1,
				link2url: '/jregistration/members',
				link2name: 'Members',
				link3: 1,
				link3url: '/jregistration/members/new',
				link3name: 'New',
				link8: 1,
				link8url: '/',
				link8name: 'JET Services'
  		});
  	});
});

app.all('/jregistration/members/new', function(req,res){
	res.render('newmemberPage', { 
  		alertMsg: undefined  || req.body.redirectMsg,
  		title: 'Create New',
  		alerttype: 'success',
  		titleurl: '/jregistration',
  		navtitle: 'JRegistration',
  		link1: 1,
  		link1url: '/jregistration',
  		link1name: 'Home',
  		link2: 1,
		link2url: '/jregistration/members',
		link2name: 'Members',
		link3: 1,
		link3url: '/jregistration/members/new',
		link3name: 'New',
		link8: 1,
		link8url: '/',
		link8name: 'JET Services'
	});
});

app.post('/jregistration/members/add/new', function(req,res){
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
	const lastpayamt = "";
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
			lastpayamt: lastpayamt,
			dues: dues
		}).then(
			function(data, headers, status){
		  		let text= first +' '+last+' successfully added';
		  		timeStampG(text);
				res.render('rerouter', {
					alertMsg: text,
					rerouter: true,
					routerUrl: '/jregistration/members/new',
				});
			},
			function(err){
				res.send(err);
		});
	});
});

app.post('/jregistration/member/edit/', function(req, res){
	const id = req.body.ekey;
	const rev = req.body.erev;
	const first = req.body.first;
	const last = req.body.last;
	const city = req.body.city;
	const age = req.body.age;
	const dob = req.body.dob;
	const com = req.body.com;
	const contact = req.body.contact;
	const email = req.body.email;
	const standing = req.body.standing;
	const lastpayment = req.body.lastpayment;
	const lastpayamt = req.body.lastpayamt;
	const dues = req.body.dues;
	console.log(timeStampR(id))
	console.log(timeStampR(rev))
	couch.update(dbName, {
		_id: id,
		_rev: rev,
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
		lastpayamt: lastpayamt,
		dues: dues
		}).then(
		function(data, headers, status){
			let text= first +' '+ last +' successfully updated';
		  	timeStampG(text);
		  	res.render('rerouter', {
				alertMsg: text,
				alerttype: 'success',
				rerouter: true,
				routerUrl: '/jregistration/members',
				title: 'Loading...',
			  	});
			},
			function(err){
				console.log(err);
				res.redirect('/jregistration/members');
		});
});

app.post('/jregistration/member/delete/', function(req, res){
	const id = req.body.delKey;
	const rev = req.body.delRev;
	const name = req.body.delName;
	console.log(timeStampR(id))
	console.log(timeStampR(rev))
	couch.del(dbName, id, rev).then(
		function(data, headers, status){
			let text= name +' removed successfully';
		  	timeStampR(text);
		  	res.render('rerouter', {
				alertMsg: text,
				rerouter: true,
				routerUrl: '/jregistration/members',
				title: 'Loading...'
			  	});
			},
			function(err){
				console.log(err);
				res.redirect('/jregistration/members');
		});
});


function serverStart() {
	app.listen(port, function(){
		console.log(`${tynt.Yellow('        ____.______________________                           .__                     ')}`);
		console.log(`${tynt.Yellow('        |    |\\_   _____/\\__    ___/   ______ ______________  _|__| ____  ____   ______')}`);
		console.log(`${tynt.Yellow('        |    | |    __)_   |    |     /  ___// __ \\_  __ \\  \\/ /  |/ ___\\/ __ \\ /  ___/')}`);
		console.log(`${tynt.Yellow('    /\\__|    | |        \\  |    |     \\___ \\\\  ___/|  | \\/\\   /|  \\  \\__\\  ___/ \\___ \\ ')}`);
		console.log(`${tynt.Yellow('    \\________|/_______  /  |____|    /____  >\\___  >__|    \\_/ |__|\\___  >___  >____  >')}`);
		console.log(`${tynt.Yellow('                      \\/                  \\/     \\/                    \\/    \\/     \\/ ')}`);
		console.log(`${tynt.Yellow('  _________                                 __________                    .__                ')}`);
		console.log(`${tynt.Yellow(' /   _____/ ______________  __ ___________  \\______   \\__ __  ____   ____ |__| ____    ____  ')}`);
		console.log(`${tynt.Yellow(' \\_____  \\_/ __ \\_  __ \\  \\/ // __ \\_  __ \\  |       _/  |  \\/    \\ /    \\|  |/    \\  / ___\\ ')}`);
		console.log(`${tynt.Yellow(' /        \\  ___/|  | \\/\\   /\\  ___/|  | \\/  |    |   \\  |  /   |  \\   |  \\  |   |  \\/ /_/  >')}`);
		console.log(`${tynt.Yellow('/_______  /\\___  >__|    \\_/  \\___  >__|     |____|_  /____/|___|  /___|  /__|___|  /\\___  / ')}`);
		console.log(`${tynt.Yellow('        \\/     \\/                 \\/                \\/           \\/     \\/        \\//_____/  ')}`);
		console.log(`${tynt.Yellow(' =================================Server running on '+ port +' ===================================')}`);
	}); 
};

setTimeout(serverStart, 1000);