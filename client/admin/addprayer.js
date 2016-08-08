Template.addPrayer.events({
	'submit form#prayer-form': function(event) {
		event.preventDefault();

		if(Meteor.userId() !== Meteor.users.findOne({username: 'admin'})._id) {
			toastr.error("You must be an admin to add the prayer request.");
			router.go('/');
			return;
		}

		const name = $('input[name=missionary-name]').val();
		const location = $('input[name=missionary-location]').val();
		const text = $('textarea[name=prayer]').val();

	}
});