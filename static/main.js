var myApp = angular.module('myApp',[]);

myApp.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

myApp.controller("appCtrl", ["$scope", function ($scope){
	$scope.firstname = "John";
	$scope.lastname = "Doe";
}]);

myApp.controller("usersCtrl", ["$scope", "$http", function ($scope, $http){
	// $scope.users = [
	// 	{
	// 		id: 1324,
	// 		name: "jll"
	// 	},
	// 	{
	// 		id: 24324,
	// 		name: "jes"
	// 	}
	// ];

	$scope.users = [];

	$scope.createUser = function(){
		$http({
			method: "POST",
			url: '/api/v1.0/users',
			data: {"name": $scope.newName}
		}).then(function successCallback(response){
			if (response.status === 201){
				$scope.users.push(response.data['user']);
				$scope.newName = "";
			}
		}, function errorCallback(response){
			//handle error
		});
		
	};

	$scope.removeUser = function(index){
		if ($scope.users.length > 0){

			$http({
				method: "DELETE",
				url: '/api/v1.0/users' + '/' + index
			}).then(function successCallback(response){
				if (response.status === 200){
					$scope.users = response.data['users'];
				}
			}, function errorCallback(response){
				//handle error
			});
		}
		else {
			alert("nothing to remove");
		}
	};

	$scope.updateUser = function(index){
		$http({
			method: 'PUT',
			url: '/api/v1.0/users' + '/' + index,
			data: {"name": $scope.newName}
		}).then(function successCallback(response){
			if (response.status === 200){
				$scope.users = response.data['users'];
			}
		},function errorCallback(response){
			//handle error
		});
	}

	$scope.fetchUsers = function(){
		$http({
            method: "GET",
           	url: '/api/v1.0/users'
        }).then(function successCallback(response){
               if (response.status === 200){
               	$scope.users = response.data['users'];
               	
               }
          	}, function errorCallback(response){
          		//handle error
        });
	}

	var init = function(){
		$scope.fetchUsers();
	}

	init();

}]);