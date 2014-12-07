var MongoDB = require("mongodb").Db;
var Server = require("mongodb").Server;
var crypto = require("crypto");
var moment = require("moment");

exports.startDate = moment("2014-11-29 11:00:00.000-06:00");
// exports.startDate = moment("2014-11-28 01:45:00.000-06:00"); //2014-11-28T1:45:00-06:00");
exports.endDate = moment("2014-12-06 22:00:00.000-06:00");

exports.db = new MongoDB("app29067833", new Server("kahana.mongohq.com", 10071, { auto_reconnect: true }), {w: 1});

exports.db.open(function(err, db) {
	if (err) {
		console.dir(err);
	} else {
		console.log("[api/common.js] connected to mongo db");
		// db.authenticate("github_user", "__temporarypassword__", function(err, res) {
		db.authenticate("asdf__asdf__asdf_user", "@'switching to a new secure password now ||$", function(err, res) {
			if (err) {
				console.dir(err);
			} else {
				console.log("[api/common.js] authenticated to mongo db");
			}
		});
	}
});

exports.esc = function(s) {
	return encodeURIComponent(s);
};

exports.token = function() {
	var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	var token = "";
	for(var i=0; i<25; i++) {
		var R = Math.floor(Math.random()*chars.length);
		token += chars.substring(R, R+1);
	}
	return token;
};

exports.extend = function(o1, o2) {
	var o = {};
	for (var attr in o1) {
		o[attr] = o1[attr];
	}
	for (var attr in o2) {
		o[attr] = o2[attr];
	}
	return o;
};

exports.sec_token = function() {
	var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	var token = "";
	for(var i=0; i<25; i++) {
		var R = Math.floor(Math.random()*chars.length);
		token += chars.substring(R, R+1);
	}
	return token;
};


exports.validatePassword = function(plain, hashed) {
	var salt = hashed.substr(0, 16);
	var valid = salt + md5(plain + salt);
	return hashed === valid;
};

exports.generateSalt = function() {
	var set = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
	var salt = "";
	for(var i=0; i<16; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
};

exports.unique = function(arr) {
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
        if(!u.hasOwnProperty(arr[i])) {
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
    }
    return a;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
};

exports.md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
};

var saltAndHash = function(pass, callback) {
	var salt = exports.generateSalt();
	callback(salt + md5(pass + salt));
};

exports.saltAndHashSync = function(pass) {
	var salt = exports.generateSalt();
	return (salt + md5(pass + salt));
};