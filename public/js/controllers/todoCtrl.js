angular.module('todoCtrl', []).controller('todoCtrl', function($scope, $http) {


    $scope.snackBar = function(msg) {
        $scope.snackHead = msg;
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
    }

    $scope.post  = function(url, data) {

        $http.post(url, data)
        .then(function(resp) {
            if (resp.data.success) {
                $scope.snackBar('Succesful');
                $scope.getDefaultObj();
            } else {
                $scope.snackBar('Something is wrong');
            }
            /* Success */
           
        }, function(resp) {

            /* Failure */
            
        });
        
        // $scope.$apply();

    };


    $scope.todayDate = new Date();
    $scope.getDefaultObj = function() {
        $scope.employeeData = {
            title : "",
            name : "",
            dob : '',
            email : "",
            marital : "",
            aadhaar : "",
            pan : ""

        };
    };

    $('#aadhaarNumber').on('keyup', function(e){
        var val = $(this).val();
        var newval = '';
        val = val.replace(/\s/g, '');
        for(var i=0; i < val.length; i++) {
            if(i%4 == 0 && i > 0) newval = newval.concat(' ');
            newval = newval.concat(val[i]);
        }
        $(this).val(newval);
    });

    $scope.getDefaultObj();
    
    
    function isString(x) {
      return Object.prototype.toString.call(x) === "[object String]"
    }

    var validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    var validatePan = function(pan) {
        pan = pan.toUpperCase();
        var regex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        return regex.test(pan);
    };

    $scope.addMore = function(employeeData) {

        console.log(employeeData);
        console.log(validatePan(employeeData.pan));

        if (!(employeeData.title)) {
            $scope.snackBar("Title field is Mandatory");
            return;
        }

        if (!isString(employeeData.name) || !employeeData.name) {
            $scope.snackBar("Name field is Mandatory and only characters are allowed. Min Length is 3 for name");
            return;
        }

        if (employeeData.name.length < 3) {
            $scope.snackBar("Min Length is 3 for name");
            return;
        }

        if (!(employeeData.dob)) {
            $scope.snackBar("DOB field is Mandatory");
            return;
        }

        if (!validateEmail(employeeData.email)) {
            $scope.snackBar("Please enter a valid Email");
            return;
        }

        if (!(employeeData.marital)) {
            $scope.snackBar("Marital status field is Mandatory");
            return;
        }

        if (!(employeeData.aadhaar)) {
            $scope.snackBar("Aadhaar field is Mandatory");
            return;
        }

        if (!validatePan(employeeData.pan)) {
            $scope.snackBar("Please enter a valid PAN");
            return;
        }

        var obj = {
            'data' : employeeData,
            'date' : Date.now()
        };
        
        $scope.post('/saveDataManual', obj);
    };

});