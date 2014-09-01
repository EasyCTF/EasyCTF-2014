var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', { title: 'EasyCTF' });
});
router.get('/login', function(req, res) {
	res.render('login', { title: 'Login - EasyCTF' });
});

router.post('/login.ajax', function(req, res) {
	res.send('hi');
});

module.exports = router;
