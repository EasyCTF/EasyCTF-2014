exports.grade = function(team, key, callback) {
	if (typeof key === "string" && key.toLowerCase().indexOf("stupid_ints_causing_those_annoying_type_errorz") != -1) {
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