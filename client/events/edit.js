Template.edit.onCreated(() => {
	Meteor.subscribe('events');
	Template.instance().checked = new ReactiveVar(false);
	Template.instance().multiday = new ReactiveVar(false);
});

Template.edit.onRendered(function() {
	$('#date').datepicker({startDate: '3d', orientation: 'bottom auto'});
	$('.clockpicker').clockpicker();
});

Template.edit.helpers({
	'other': function() {
		return Template.instance().checked.get();
	},
	'colSize': function() {
		if(Template.instance().multiday.get()) {
			return "col-md-3";
		}
		return "col-md-4";
	},
	'multi': function() {
		return Template.instance().multiday.get();
	},
	'date1': function() {
		return moment(this.start).format("MM/DD/YYYY");
	},
	'date2': function() {
		return moment(this.end).format("MM/DD/YYYY");
	},
	'time1': function() {
		return moment(this.start).format("HH:mm");
	},
	'time2': function() {
		return moment(this.end).format("HH:mm");
	}
});

Template.edit.events({
	'click #other': function() {
		Template.instance().checked.set(true);
	},
	'click #GP': function() {
		Template.instance().checked.set(false);
	},
	'click #multiday': function() {
		if(Template.instance().multiday.get()) {
			Template.instance().multiday.set(false);
		} else {
			Template.instance().multiday.set(true);
		}
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
		const multiday = $("input[name=multiday]").is(':checked');

		if(host === "Other" && ($('input[name=host-link]').val() !== "")) {
			link = "http://" + $('input[name=host-link]').val();
		}

		let endString = "";

		const startString = date + " " + startingTime;
		const start = moment(startString, "MM/DD/YYYY HH:mm").toDate();

		if(multiday) {
			const endDate = $('#end-date').val();
			endString = endDate + " " + endingTime;
		} else {
			endString = date + " " + endingTime;
		}
		const end = moment(endString, "MM/DD/YYYY HH:mm").toDate();

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
		if(!host) {
			toastr.error("Select the party hosting this event.");
			return;
		}
		if(!start || !end){
			toastr.error('Please check to make sure the time is entered correctly.');
			return;
		}
		if(start.getTime() > end.getTime()) {
			toastr.error("Please make sure the start time is before the end.");
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
					start: start,
					end: end,
					description: description,
					location: host,
					link: link,
					featured: checked
				};	
				Meteor.call("editEvent", this._id, attr, function(error, result) {
					if(error) {
						toastr.error("Error");
						console.log(error);
					} else {
						toastr.success("Event successfully updated");
						Router.go('/calendar');
					}
				});
			}
		} else {
			const attr = {
				title: name,
				start: start,
				end: end,
				description: description,
				location: host,
				link: link,
				featured: checked
			};	
			Meteor.call("editEvent", this._id, attr, function(error, result) {
				if(error) {
					toastr.error("Error");
					console.log(error);
				} else {
					toastr.success("Event successfully updated");
					Router.go('/calendar');
				}
			});
		}

	}
});