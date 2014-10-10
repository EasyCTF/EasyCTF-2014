exports.data = function() {
	var result = [];

	var s = [
		"[Go, droop aloof] sides reversed, is [fool a poor dog]. I did roar again, Niagara! ... or did I?",
		"Help Max, Enid -- in example, H. See, slave, I demonstrate yet arts no medieval sees.",
		"Egad, a base tone denotes a bad age. So may Obadiah, even in Nineveh, aid a boy, Amos. Naomi, did I moan?",
		"Sir, I soon saw Bob was no Osiris. Poor Dan is in a droop.",
	];
	result.push(s[(Math.random()*s.length)|0]);

	return result;
};

exports.check = function(output, data) {
	var s = data[0];

	var longest = "";
	var longestOrig = "";
	for(var i = s.length - 1; i >= 0; i--) {
		for (var j = i + 1; j < s.length; j++) {
			var q = s.substring(i, j);
			var t = q.replace(/[^A-Za-z]/gi,'').toLowerCase();
			if (t == t.split("").reverse().join("") && t.length > longest.length) {
				longest = t;
				longestOrig = q.trim();
			}
		}
	}
	console.log(longestOrig);

	return longestOrig == parseInt(output);
};

exports.flag = function() {
	return "did_you_use_[::-1]_notation";
};
