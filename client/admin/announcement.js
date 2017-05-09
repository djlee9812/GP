Template.announcement.onRendered(function () {
	Meteor.subscribe('announcements');
})

Template.announcement.events({
	"submit form": function(event) {
		event.preventDefault();

		const checkedBoxes = $("input:checked").val();
		Meteor.call('updateAnnouncement', checkedBoxes, function(err, result) {
			if(!err) {
				Router.go('/');
			}
		});
	},
});