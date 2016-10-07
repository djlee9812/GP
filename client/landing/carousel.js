Template.carousel.onCreated(function() {
});

Template.carousel.onRendered(() => {
	Meteor.subscribe("images", {
		onReady: function() {
			$(".owl-slider-v4").owlCarousel({
				responsive: {
					0:{
						items:1,
						nav:true
					},
					600:{
						items:2,
						nav:false
					},
					1000:{
						items:4,
						nav:false
					}
				},
				loop: true,
				autoplay: true,
			});
		}
	});
});

Template.carousel.helpers({
	photos: function() {
		return Images.find({}, {limit: 12, sort: {timeInserted: -1}});
	}
});

Template.carousel.onDestroyed(() => {
	$(".owl-slider-v4").data('owlCarousel').destroy();
});