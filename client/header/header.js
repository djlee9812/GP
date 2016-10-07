Template.header.events({
	'click .click-logout': function(event) {
		event.preventDefault();
		Meteor.logout();
		Router.go('/');
	}
});

Template.header.helpers({
	'admin': function() {
		var adminId = Meteor.users.findOne({username: 'admin'})._id;
		var userId = Meteor.userId();
		return adminId === userId;
	}
})