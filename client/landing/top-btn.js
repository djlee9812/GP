Template.topBtn.events({
	'click #return-top': function() {
		$('html,body').animate({scrollTop:0}, 600);
		return false;
	}
});