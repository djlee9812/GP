Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.onBeforeAction(function() {
	if (!Meteor.userId()) {
		this.render('Login');
		toastr.warning("You must login before accessing the admin page");
	} else if(Meteor.userId() !== Meteor.users.findOne({username: 'admin'})._id) {
		toastr.warning("You need to be an administrator to access the admin page.");
		this.render('home');
	} else {
		this.next();
	}
}, {
	only: ['admin']
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

Router.route('/current', function() {
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

Router.route('/districts', function() {
	this.render('districts');
});

Router.route('/d1', function() {
	this.render('d1');
});

Router.route('/d2', function() {
	this.render('d2');
});

Router.route('/d3', function() {
	this.render('d3');
});

Router.route('/d4', function() {
	this.render('d4');
});

Router.route('/d5', function() {
	this.render('d5');
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