Template.header.events({
	"click .search": function() {
		if($('.search-btn').hasClass('fa-search')){
			$('.search-open').fadeIn(500);
			$('.search-btn').removeClass('fa-search');
			$('.search-btn').addClass('fa-times');
		} else {
			$('.search-open').fadeOut(500);
			$('.search-btn').addClass('fa-search');
			$('.search-btn').removeClass('fa-times');
		}
	},
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