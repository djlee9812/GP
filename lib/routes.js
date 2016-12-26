Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.onBeforeAction(function() {
	if(!Meteor.userId()) {
		this.render('Login');
		toastr.warning("You must login before accessing this page");
	} else if(Meteor.userId() !== Meteor.users.findOne({username: 'admin'})._id) {
		toastr.warning("You need to be an administrator to access this page.");
		this.render('home');
	} else {
		this.next();
	}
}, {
	only: ['admin', 'edit']
});

AccountsTemplates.configure({
	defaultLayout: 'layout',
	enablePasswordChange: true,
	showForgotPasswordLink: true,
	onLogoutHook: function() {
		Router.go('/');
	}

});

AccountsTemplates.configureRoute('signIn', {
	name: 'signin',
	path: '/login',
	template: 'login',
	redirect: '/'
});

AccountsTemplates.configureRoute('signUp', {
	name: 'signup',
	path: '/signup',
	template: 'login',
	redirect: '/'
});

AccountsTemplates.configureRoute('forgotPwd', {
	name: 'forgot',
	path: '/forgot-password',
	template: 'login',
	redirect: '/login'
});

Router.route('/', function() {
	this.render('home');
});

Router.route('/about', function() {
	this.render('about');
});

Router.route('/contact', function() {
	this.render('contact');
});

Router.route('/donate', function() {
	this.render('donate');
});

Router.route('/overview', function() {
	this.render('overview');
});

Router.route('/apply', function() {
	this.render('applyNow');
});

Router.route('/demand', function() {
	this.render('current');
});

Router.route('/training', function() {
	this.render('training');
});

Router.route('/calendar', function() {
	this.render('calendar');
});

Router.route('/gallery', function() {
	this.render('gallery');
});

Router.route('/mission', function() {
	this.render('mission');
});

Router.route('/creed', function() {
	this.render('creed');
});

Router.route('/admin', function() {
	this.render('admin');
});

Router.route('/resources', function() {
	this.render('resources');
});

Router.route('/prayer', function() {
	this.render('prayer');
});

Router.route('/values', function() {
	this.render('values');
});

Router.route('/edit/:_id', function() {
	this.subscribe('events').wait();
	if(this.ready()){
		this.render('edit', {
			data: function() {
				return Events.findOne({_id: this.params._id});
			},
		});	
	} else {
		this.render('loading');
	}
}, {
	name: 'edit'
});