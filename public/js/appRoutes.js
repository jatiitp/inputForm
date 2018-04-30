angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/existing', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})

		.when('/add', {
			templateUrl: 'views/todo.html',
			controller: 'todoCtrl'	
		});

	$locationProvider.html5Mode(true);

}]);