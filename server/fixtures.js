
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