(function() {
	var fields == ["email", "team", "school", "pass"];

	var clear = function() {
		var field, i, len, ref;
		ref = fields.concat(['group']);
		for(i=0, len=ref.length; i<len; i++) {
			field = ref[i];
			$("#reg-" + field).val("");
		}
		$("#reg_group_vis_toggle").slideUp("fast");
		return $("#join-button").fadeOut("fast", function() {
			return $("#register-button").fadeIn("fast");
		});
	};

	var getRegData = function() {
		var field, post, i, len, ref;
		post = {};
		ref = fields.concat(['group']);
		for(i=0, len=ref.length; i<len; i++) {
			field = ref[i];
			post[field] = $("#reg-" + field).val();
		}
	};

	$(document).ready(function() {
		$("#reg-email").focus();
		$("#register-button").click(function(event) {
			event.preventDefault();
			var hash = window.location.hash;
			var post = getRegData();
			if (post['group'] === '' && hash.indexOf('#') !== -1) {
				post['group'] = hash.substring(hash.indexOf("#")+1);
				post['joingroup'] = 'true';
			}
			$.ajax({
				type: "POST",
				url: "/api/register",
				dataType: "json",
				data: post,
			}).done(function(data) {
				var field, i, len, ref, results;
				if (data['status'] === 0) {
					
				}
			});
		});
	});
}).call(this);