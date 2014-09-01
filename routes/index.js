var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', { title: 'EasyCTF' });
});
router.get('/login', function(req, res) {
	res.render('login', { title: 'Login - EasyCTF' });
});
router.get('/register', function(req, res) {
	res.render('register', { title: 'Register - EasyCTF' });
});

router.post('/login.ajax', function(req, res) {
	res.send('hi');
});
router.post('/register.ajax', function(req, res) {
	var MongoClient = require('mongodb').MongoClient, format = require('util').format;
	MongoClient.connect('mongodb://github_user:__temporarypassword__@kahana.mongohq.com:10071/app29067833', function (err, db) {
		if (err) {
			throw err;
		} else {
		}
		db.close();
	});
});

module.exports = router;
