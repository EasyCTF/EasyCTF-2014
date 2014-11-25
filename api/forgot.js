var common = require("./common");
var moment = require("moment");
var sendgrid = require('sendgrid')("app29067833@heroku.com" || process.env.SENDGRID_USERNAME, "0o6xvuek" || process.env.SENDGRID_PASSWORD);

exports.send_reset_email = function(req, res) {
	var email = req.param("email");

	if (!email) {
		res.send({
			success: 0,
			message: "You have to enter an email!",
		});
		return;
	}

	common.db.collection("accounts").find({
		email: email
	}).toArray(function(err, data) {
		if (err) {
			res.send({
				success: 0,
				message: "An internal error occurred."
			});
			return;
		}

		if (data.length == 0) {
			res.send({
				success: 0,
				message: "Couldn't find your email. Try signing up?"
			});
			return;
		}

		if (data.length > 1) {
			res.send({
				success: 0,
				message: ""
			});
			return;
		}

		var checkTeam = data[0];
		var salt = common.generateSalt();
		var code = common.md5(email+salt) + salt;
		var expire = moment().add(48, "hours");

		// deactivate existing codes for this email
		common.db.collection("reset_password").update({
			email: email,
			active: true
		}, {
			$set: {
				active: false
			}
		}, function(err2, data2) {
			// insert a request
			common.db.collection("reset_password").insert({
				code: code,
				email: email,
				salt: salt,
				expire: expire.format(),
				active: true
			}, { w: 1 }, function(err3, data3) {
				if (err3) {
					res.send({
						success: 0,
						message: "Couldn't make a password reset request."
					});
					return;
				}

				sendgrid.send({
					to: email,
					from: "team@easyctf.com",
					fromname: "EasyCTF Team",
					replyto: "team@easyctf.com",
					subject: "Password Reset Requested.",
					html: '<p>Hey there</p><p>Someone (hopefully you) requested to change the password for the account with the email ' + req.param('email') + '. Obviously, we\'ll be asking for verification of identity, so if you did in fact request this, follow this link: http://easyctf.com/forgot/' + code + "</p><p>EasyCTF Team</p>"
				}, function(err4, json) {
					if (err4) {
						res.send({
							success: 0,
							message: "Failed to send email"
						});
						return;
					} else {
						res.send({
							success: 1,
							message: "Email successfully sent!"
						});
						return;
					}
				});
			});
		});
	});
};

exports.verify_code = function(req, res) {
	var code = req.param("code");
	var pass = req.param("p1");
	var confirm = req.param("p2");

	if (!(code && pass && confirm)) {
		res.send({
			success: 0,
			message: "You must fill out all of the fields!"
		});
		return;
	}

	if (pass !== confirm) {
		res.send({
			success: 0,
			message: "Passwords don't match."
		});
		return;
	}

	common.db.collection("reset_password").find({
		code: code,
		active: true
	}).toArray(function(err, data) {
		if (err) {
			res.send({
				success: 0,
				message: "Internal error.",
			});
			return;
		}
		if (data.length == 0) {
			res.send({
				success: 0,
				message: "Couldn't find an active ticket for this code. Try requesting another"
			});
			return;
		}

		var obj = data[0];
		var now = moment();
		var exp = moment(obj.expire);
		if (now.isBefore(exp) && obj.active) {
			var salt = common.generateSalt();
			var salted = salt + common.md5(pass + salt); //yum
			common.db.collection("reset_password").update({
				code: code
			}, {
				$set: {
					active: false
				}
			}, function(err2, data2) {
				if (err2) {
					res.send({
						success: 0,
						message: "Internal error.",
					});
					return;
				}
				common.db.collection("accounts").update({
					email: obj.email
				}, {
					$set: {
						pass: salted
					}
				}, function(err3, data3) {
					if (err3) {
						res.send({
							success: 0,
							message: "Internal error.",
						});
						return;
					} else {
						res.send({
							success: 1,
							message: "Your password has been changed!"
						});
						return;
					}
				});
			});
		} else {
			res.send({
				success: 0,
				message: "Maybe your code expired?"
			});
			return;
		}
	});
}