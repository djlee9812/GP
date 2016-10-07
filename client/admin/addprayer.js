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

		if(!name) {
			toastr.error("You must enter the missionary's name");
			return;
		}
		if(!location) {
			toastr.error("You must enter the missionary location");
			return;
		}
		if(!text) {
			toastr.error("Enter the prayer request");
			return;
		}

		const attr = {
			name: name,
			location: location,
			request: text
		}
		console.log(attr);

		Meteor.call("insertPrayer", attr, function(error, result) {
			if(error) {
				toastr.error("Error in submitting request.");
				console.log(error);
			} else {
				toastr.success("Event successfully added");
				Router.go('/prayer');
			}
		});
	}
});