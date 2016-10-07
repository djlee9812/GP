Template.addEvent.onCreated(function() {
	Template.instance().checked = new ReactiveVar(false);
})

Template.addEvent.onRendered(function() {
	$('.datepicker').datepicker({startDate: '3d', orientation: 'bottom auto'});
	$('.clockpicker').clockpicker();
});

Template.addEvent.helpers({
	'other': function() {
		return Template.instance().checked.get();
	},
	'today': function() {
		const today = moment(new Date()).format("MM/DD/YYYY");
		return today;
	}
});

Template.addEvent.events({
	'click #other': function() {
		Template.instance().checked.set(true);
	},
	'click #GP': function() {
		Template.instance().checked.set(false);
	},
	'submit form#event-form': function(event) {
		event.preventDefault();

		if(Meteor.userId() !== Meteor.users.findOne({username: 'admin'})._id) {
			toastr.error("You must be an admin to add the event.");
			router.go('/');
			return;
		}

		const name = $('#event-name').val();
		const date = $('#date').val();
		const startingTime = $('#starting-time').val();
		const endingTime = $('#ending-time').val();
		const description = $('#event-description').val();
		const host = $('input[name=optradio]:checked').val();
		let link = "#";
		const checked = $("input[name=featured]").is(':checked');

		if(host === "Other" && ($('input[name=host-link]').val() !== "")) {
			link = "http://" + $('input[name=host-link]').val();
		}
		console.log(link);
		const startString = date + " " + startingTime;
		const start = moment(startString, "MM/DD/YYYY HH:mm");
		const endString = date + " " + endingTime;
		const end = moment(endString, "MM/DD/YYYY HH:mm");

		if(!name) {
			toastr.error("You must enter an event name");
			return;
		}
		if(!date) {
			toastr.error("You must enter the event date");
			return;
		}
		if(!startingTime) {
			toastr.error("You must enter the start time");
			return;
		}
		if(!endingTime) {
			toastr.error("You must enter the end time");
			return;
		}
		if(!description) {
			toastr.error("You must write a description for the event");
			return;
		}
		if(!host) {
			toastr.error("Select the party hosting this event.");
			return;
		}
		if(!start.toDate() || !end.toDate()){
			toastr.error('Please check to make sure the time is entered correctly.');
			return;
		}

		if(link !== "#") {
			const exp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
			const regex = new RegExp(exp);
			if(!link.match(regex)) {
				toastr.error("Your link is invalid. Please check that you have entered a correct link.");
				return;
			} else {
				const attr = {
					title: name,
					start: start.toDate(),
					end: end.toDate(),
					description: description,
					location: host,
					link: link,
					featured: checked
				};	

				Meteor.call("insertEvent", attr, function(error, result) {
					if(error) {
						toastr.error("Error in submitting event.");
						console.log(error);
					} else {
						toastr.success("Event successfully added");
						Router.go('/calendar');
					}
				});
			}
		} else {
			const attr = {
				title: name,
				start: start.toDate(),
				end: end.toDate(),
				description: description,
				location: host,
				link: link,
				featured: checked
			};	

			Meteor.call("insertEvent", attr, function(error, result) {
				if(error) {
					toastr.error("Error in submitting event.");
					console.log(error);
				} else {
					toastr.success("Event successfully added");
					Router.go('/calendar');
				}
			});
		}

	}
});