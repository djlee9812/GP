Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
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

Router.route('/missions/overview', function() {
	this.render('overview');
});

Router.route('/missions/apply', function() {
	this.render('applyNow');
});

Router.route('/missions/current', function() {
	this.render('current');
});

Router.route('/missions/training', function() {
	this.render('training');
});

Router.route('/events/calendar', function() {
	this.render('calendar');
});

Router.route('/events/gallery', function() {
	this.render('gallery');
});