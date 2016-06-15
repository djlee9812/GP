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
});