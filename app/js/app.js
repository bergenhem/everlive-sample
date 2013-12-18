var KendoApp = (function() {
	var _kendoApp = {};
	var _usersViewModel,
		_typesViewModel;

	var _everLive = new Everlive('nNrMn8Wnn4qXbYmG');


	_usersViewModel = new kendo.observable({
		getAllUsers: function() {
			_everLive.Users.get()
				.then(function(data) {
					console.log(data);
				},
				function(error) {
					console.log(error);
				});
		},
		getSingleUser: function(userName) {

		},
		addUser: function(userName, password, email) {
			
		},
		removeUser: function(userName) {

		}
	});

	_typesViewModel = new kendo.observable({
		getAll: function() {

		},
		getSingleItem: function() {

		},
		addItem: function(item) {

		},
		updateItem: function(item) {

		},
		removeItem: function(item) {

		}
	});

	_kendoApp.startApp = function() {
		//create our layout
		var myLayout = new kendo.Layout('kendo-layout-template'); 

		//render in our placeholder element
		myLayout.render('#app');

		//initialize our router
		var myRouter = new kendo.Router();

		//Views
		var homeView = new kendo.View('home-view'); 
		var usersView = new kendo.View('users-view', {
			model: _usersViewModel
		});
		var typesView = new kendo.View('types-view', {
			model: _typesViewModel
		});

		//Routes
		myRouter.route('/', function() {
			myLayout.showIn('#content', homeView);
		});

		myRouter.route('/users/', function() {
			myLayout.showIn('#content', usersView);
		});

		myRouter.route('/types/', function() {
			myLayout.showIn('#content', typesView);
		});

		//start the actual router
		myRouter.start();
	};

	_kendoApp.usersViewModel = _usersViewModel;
	_kendoApp.typesViewModel = _typesViewModel;

	return _kendoApp;
})();