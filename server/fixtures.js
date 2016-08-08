
if(!Images.findOne()) {
	for(var i=37; i>=1; i--) {
		var source = i + ".jpg";
		var name = "Image " + i
		Images.insert({
			'src': source,
			'title': name,
			'timeInserted': new Date()
		});
	}
}

if(!Events.findOne()) {
	Events.insert({
		title: "Sample Event",
		start: new Date("June 2, 2016 11:00:00"),
		end: new Date("June 2, 2016 14:00:00"),
		description: "Sample event to test out features on the calendar.",
		location: 'GP',
		url: "#"
	});
	Events.insert({
		title: "Sample Event 2",
		start: new Date("June 3, 2016 13:00:00"),
		end: new Date("June 3, 2016 14:00:00"),
		description: "Sample event 2 to test out features on the calendar.",
		location: 'other',
		url: '#'
	});
	Events.insert({
		title: "Sample Event 3",
		start: new Date("June 20, 2016 13:00:00"),
		end: new Date("June 20, 2016 23:30:00"),
		description: "Sample event 3 to test out features on the calendar.",
		location: 'other',
		url: 'http://google.com'
	});
}