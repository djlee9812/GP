Template.home.onRendered(function() {
	Meteor.subscribe("announcements", function() {
		if(Announcements.findOne().training) {
			toastr.info("Visit the missions training page for details", "UPCOMING TRAINING")
		}
	});
});