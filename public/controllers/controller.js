var myApp = angular.module('myApp', []);
myApp.controller('AppCtrls', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
    var refresh=function(){
    $http.get('/retaillist').then(function(response){
    	console.log("I got the data I requested");
    	$scope.retaillist=response.data;
    	

    });

};
refresh();
   
    $scope.addproduct=function(){
    	console.log($scope.produ);
    	$http.post('/retaillist',$scope.produ).then(function(response){
    		console.log(response);
           $scope.produ=" ";
             refresh();
    	});
 
    };
    $scope.remove=function(id){
    	console.log(id);
$http.delete('/retaillist/' +id).then(function(response){
	refresh();
});
    };
     $scope.edit=function(id){
    	console.log(id);
$http.get('/retaillist/' +id).then(function(response){
	$scope.produ=response.data;
});
    };
     $scope.update=function(){
    	console.log($scope.produ._id);
 $http.put('/retaillist/' + $scope.produ._id, $scope.produ).then(function(response) {
    refresh();
  });

    };
$scope.deselect=function(){
	$scope.produ="";
}
}]);
