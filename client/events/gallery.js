Template.gallery.onCreated( function() {
	Meteor.subscribe("images");
	const tmpl = Template.instance();
	tmpl.imageLimit = new ReactiveVar(9);
});

Template.gallery.onRendered(function() {
	//infinite scroll event handler
	const tmpl = Template.instance();
	$(window).scroll(function(event) {
		/*make sure to fix scroll height event trigger after fixing bottom display

gada
dgmadsg
	gadsgjalsgj
		*/
		if ($(window).scrollTop() + $(window).height() >= $(document).height() - 530){	
			const current = tmpl.imageLimit.get();
			tmpl.imageLimit.set(current + 6);
		}
	});

	$('.fancybox').fancybox({
		groupAttr: 'data-rel',
		prevEffect: 'fade',
		nextEffect: 'fade',
		openEffect  : 'elastic',
		closeEffect  : 'fade',
		closeBtn: true,
		helpers: {
			title: {
				type: 'float'
			}
		}
	});
	$(".fbox-modal").fancybox({
		maxWidth    : 800,
		maxHeight   : 600,
		fitToView   : false,
		width       : '70%',
		height      : '70%',
		autoSize    : false,
		closeClick  : false,
		closeEffect : 'fade',
		openEffect  : 'elastic'
	});
});

Template.gallery.events({
	'click a': function(e) {
		e.preventDefault();
	}
});

Template.gallery.helpers({
	photos: function() {
		const lim = Template.instance().imageLimit.get();
		return Images.find({}, {sort: {timeInserted: -1}, 
			limit: lim
		});
	}
});