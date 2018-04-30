angular.module('GeekCtrl', []).controller('GeekController', function($scope,$http) {

	$scope.tagline = 'The square root of life is pi!';
	$scope.fetchDataOnLoad = function() {
        $http.get('/getData')
            .then(function(resp) {
                $scope.employeeList = resp.data.docs;
                
            }, function(resp) {
                /* Failure */
                
            });
    }
    $scope.fetchDataOnLoad();	

    $scope.snackBar = function(msg) {
        $scope.snackHead = msg;
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }


    $scope.post  = function(url, data) {

        $http.post(url, data)
        .then(function(resp) {
            if (resp.data.success) {
                $scope.fetchDataOnLoad();
                $scope.snackBar('Succesful');
            } else {
                $scope.snackBar('Something is wrong');
            }
            /* Success */
           
        }, function(resp) {

            /* Failure */
            
        });
        
        // $scope.$apply();

    };

    $scope.employeeData = {
        firstName : "",
        lastName : "",
        age : "",
        designation : "",

    };
   
    function isString(x) {
      return Object.prototype.toString.call(x) === "[object String]"
    }
    $scope.addMore = function(employeeData) {
        console.log(employeeData);

        if (!isString(employeeData.firstName)) {
            $scope.snackBar("Only characters is allowed");
            return;
        }

        if (!isString(employeeData.lastName)) {
            $scope.snackBar("Only characters is allowed");
            return;
        }

        if (employeeData.age > 60 || employeeData.age < 18) {
            $scope.snackBar("Age should be greater than 18 and less than 60");
            return;
        }
        
        var obj = {
            'data' : employeeData,
        };
        
        $scope.post('/saveDataManual', obj);
    };

    $scope.isEdit = false;
    $scope.edit = function(index) {

        $scope.isEdit = true;
        $scope.employeeData = $scope.employeeList[index].data;

    };

    $scope.mainIndex = 0;
    $scope.delete = function(index) {
        var obj = {
        	"data" : $scope.employeeList[index].data,
        	'date' : $scope.employeeList[index].date
        }
        $scope.post("/delete", obj);
    };

    $scope.save = function(employeeData) {
        if (!isString(employeeData.firstName)) {
            $scope.snackBar("Only characters is allowed");
            return;
        }

        if (!isString(employeeData.lastName)) {
            $scope.snackBar("Only characters is allowed");
            return;
        }

        if (employeeData.age > 60 || employeeData.age < 18) {
            $scope.snackBar("Age should be greater than 18 and less than 60");
            return;
        }
        var obj = {
        	"data" : employeeData,
        	'date' : $scope.employeeList[$scope.mainIndex].date
        }
        $scope.post("/saveData", obj);
        $scope.isEdit = false;
    };

    $scope.cancel = function(index) {
        $scope.isEdit = false;
    };

});