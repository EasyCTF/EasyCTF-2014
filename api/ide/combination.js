var flag = "putting_it_all_t0gether";

exports.get_data = function(req, callback) {
	var result = [];

	result.push("Let's put all your skills together now. ");
	result.push('A');
	result.push("thisisastringoflength23");
	result.push(1787569);
	result.push("wouldn't it be great if this were a palindrome");
	req.session.data = result;
	callback(result);
};

exports.check_data = function(req, callback) {
	var data = req.session.data;
	var ans = "";
	var a = data;
	var b = typeof a[2];
	function reverse(s) {
	return s.split('').reverse().join('');
	}
	ans = a[0]+String(b)+String(a[2].length)+String(Math.sqrt(a[3]))+String(reverse(a[4]));
	var answer = req.param("answer");
	var correct = ans;
	if (answer) {
		answer = answer.replace(/^\s+|\s+$/g,'');
		correct = correct.replace(/^\s+|\s+$/g,'');
		if (answer.toLowerCase() === correct.toLowerCase()) {
			callback({
				status: 1,
				message: "Great job! Your flag is <code>" + flag + "</code>",
			});
			return;
		} else {
			callback({
				status: 0,
				message: "Nope, try again..."
			});
			return;
		}
	} else {
		callback({
			status: 0,
			message: "Answer cannot be empty!"
		});
		return;
	}
};

