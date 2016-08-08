Template.slider.onRendered(function() {
	var revapi;
	revapi = $('.tp-banner').revolution(
	{
		delay:12000,
		startwidth:1170,
		startheight:400,
		hideThumbs:10,
		fullWidth:"off",
		fullScreen:"on",
		hideCaptionAtLimit: "",
		dottedOverlay:"twoxtwo",
		navigationStyle:"round",
		fullScreenOffsetContainer: ".header-v3"
	});
});

Template.slider.onDestroyed(function() {
	$('.tp-banner').revkill();

})