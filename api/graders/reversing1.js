exports.grade = function(team, key, callback) {
	var flag = "eeeeeeeeeeeeeEeesy_ctf";
	if (typeof key === "string" && key.toLowerCase().indexOf(flag.toLowerCase()) != -1) {
		callback({
			correct: true,
			message: "Nice job!"
		});
	} else {
		callback({
			correct: false,
			message: "Hm... try again."
		});
	}
};