
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
		title: "Prayer Meeting",
		start: new Date("September 13, 2016 19:00:00"),
		end: new Date("September 13, 2016 21:00:00"),
		description: "Our monthly prayer meeting to pray for the missionaries and current events.",
		location: 'GP',
		url: "#"
	});
	Events.insert({
		title: "Prayer Meeting",
		start: new Date("October 6, 2016 10:00:00"),
		end: new Date("October 6, 2016 12:00:00"),
		description: "Our monthly prayer meeting to pray for the missionaries and current events.",
		location: 'GP',
		url: "#"
	});
	Events.insert({
		title: "Prayer Meeting",
		start: new Date("November 3, 2016 10:00:00"),
		end: new Date("November 3, 2016 12:00:00"),
		description: "Our monthly prayer meeting to pray for the missionaries and current events.",
		location: 'GP',
		url: "#"
	});
	Events.insert({
		title: "Prayer Meeting",
		start: new Date("December 1, 2016 10:00:00"),
		end: new Date("December 1, 2016 12:00:00"),
		description: "Our monthly prayer meeting to pray for the missionaries and current events.",
		location: 'GP',
		url: "#"
	});
}
if(!Prayers.findOne()) {
	Prayers.insert({
		name: "Missionary Name",
		location: "City, Country",
		request: "Donec id elit non mi porta gravida at eget metus. Fusce dapibus, justo sit amet risus etiam porta sem...",
		submitted: new Date()
	});
}