var KendoApp = (function() {
	var _kendoApp = {};
	var _usersViewModel,
		_typesViewModel;

	var _everLive = new Everlive('nNrMn8Wnn4qXbYmG');
	var _scData = _everLive.data('SC');

	//Our Users View
	//You will see the following pattern:
	//Click Event - Function calling Everlive
	//
	//The most important bit is the function calling Everlive,
	//the click event is just some quick jQuery to get the field values
	_usersViewModel = new kendo.observable({
		addUserClick: function(e) {
			e.preventDefault();
			var userName = $('#userNameInput').val();
			var password = $('#passwordInput').val();
			var email = $('#emailInput').val();

			_usersViewModel.addUser(userName, password, email);
		},
		addUser: function(userName, password, email) {
			_everLive.Users.register(userName, password,
			{
				Email: email
			},
			function(data) {
				console.log('Added User: ' + JSON.stringify(data));
			},
			function(error) {
				console.log(error);
			});

			var carl = 'Awesome!';
			console.log(carl);
		},
		getAllUsersClick: function(e) {
			e.preventDefault();

			_usersViewModel.getAllUsers();
		},
		getAllUsers: function() {
			_everLive.Users.get()
				.then(function(data) {
					console.log('Get All Users: ' + JSON.stringify(data));
				},
				function(error) {
					console.log(error);
				});
		},
		getUserIdClick: function(e) {
			e.preventDefault();

			var id = $('#userIdInput').val();

			_usersViewModel.getSingleUser(id);
		},
		getSingleUser: function(id) {
			_everLive.Users.getById(id)
				.then(function(data) {
					console.log('Get Single User: ' + JSON.stringify(data));
				},
				function(error) {
					console.log(error);
				});
		},
		removeUserClick: function(e) {
			e.preventDefault();

			var userName = $('#removeUserInput').val();

			_usersViewModel.removeUser(userName);
		},
		removeUser: function(userName) {
			_everLive.Users.destroy({ 'Username': userName },
				function(data) {
					console.log('Removed User: ' + JSON.stringify(data));
				},
				function(error) {
					console.log(error);
				});
		},
		logInClick: function(e) {
			e.preventDefault();

			var userName = $('#loginUserInput').val();
			var password = $('#loginPasswordInput').val();

			_usersViewModel.logIn(userName, password);
		},
		logIn: function(userName, password) {
			_everLive.Users.login(userName, password,
				function(data) {
					console.log('Logged In: ' + JSON.stringify(data));
				},
				function(error) {
					console.log(error);
				});
		},
		logOutClick: function(e) {
			e.preventDefault();

			_usersViewModel.logOut();
		},
		logOut: function() {
			_everLive.Users.logout();
			console.log('Logged out!');
		}
	});

	//Our Types View
	//You will see the following pattern:
	//Click Event - Function calling Everlive
	//
	//The most important bit is the function calling Everlive,
	//the click event is just some quick jQuery to get the field values
	_typesViewModel = new kendo.observable({
		addItemClick: function(e) {
			e.preventDefault();

			var name = $('#scNameInput').val();
			var isAttending = $('#attendingCheckBox').is(':checked');

			_typesViewModel.addItem(name, isAttending);
		},
		addItem: function(name, isAttending) {
			_scData.create({
				'Name': name,
				'Attending': isAttending
			},
			function(data) {
				console.log('Added Item: ' + JSON.stringify(data));
			},
			function(error) {
				console.log(error);
			});
		},
		getAllItemsClick: function(e) {
			e.preventDefault();

			_typesViewModel.getAll();
		},
		getAll: function() {
			_scData.get()
				.then(function(data) {
					console.log('Get All SCs: ' + JSON.stringify(data));
				},
				function(error){
					console.log(error);
				});
		},
		getSingleItemIdClick: function(e) {
			e.preventDefault();

			var id = $('#itemId').val();

			_typesViewModel.getSingleItem(id);
		},
		getSingleItem: function(id) {
			_scData.getById(id)
				.then(function(data) {
					console.log('Get Single Item By ID: ' + JSON.stringify(data));
				},
				function(error){
					console.log(error);
				});
		},
		getSingleItemFilterClick: function(e) {
			e.preventDefault();

			var name = $('#itemName').val();

			_typesViewModel.getSingleItemFilter(name);
		},
		getSingleItemFilter: function(name) {
			var filter = {
				'Name' : name
			};
			_scData.get(filter)
				.then(function(data) {
					console.log('Get Single Item By Filter: ' + JSON.stringify(data));
				},
				function(error) {
					console.log(error);
				});
		},
		updateItemClick: function(e) {
			e.preventDefault();

			var id = $('#idUpdateInput').val();
			var name = $('#scNameUpdateInput').val();
			var isAttending = $('#attendingUpdateCheckBox').is(':checked');

			_typesViewModel.updateItem(id, name, isAttending);
		},
		updateItem: function(id, name, isAttending) {
			_scData.updateSingle({ 
				Id: id,
				'Name': name,
				'Attending': isAttending
			},
			function(data) {
				console.log('Updated Item: ' + JSON.stringify(data));
			},
			function(error) {
				console.log(error);
			});
		},
		removeItemClick: function(e) {
			e.preventDefault();

			var id = $('#removeItemIdInput').val();

			_typesViewModel.removeItem(id);
		},
		removeItem: function(id) {
			_scData.destroySingle( { Id: id },
				function(data) {
					console.log('Deleted Item: ' + JSON.stringify(data));
				},
				function(error) {
					console.log(error);
				});
		}
	});

	//Set up our Kendo UI SPA
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

	//This is just for learning purposes so that we can see the two ViewModels 
	//and our Everlive object in the console
	_kendoApp.usersViewModel = _usersViewModel;
	_kendoApp.typesViewModel = _typesViewModel;
	_kendoApp.everLive = _everLive;

	return _kendoApp;
})();