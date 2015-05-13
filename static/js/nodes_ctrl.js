(function(){

  'use strict';

  angular.module('flink')
    .controller('NodesCtrl', function($scope,$http,$q,$rootScope,Node){

      $rootScope.nodes = [];

      $scope.loadNodes =  function(){
        $http
          .get('/api/nodes')
          .success(function(data) {
            if( !data.nodes )
              return;
            var promises = [];
            data.nodes.forEach( function(nodeId){
              var promise = $scope.loadNode( nodeId );
              promises.push( promise );
            });
            $q.all( promises )
              .then( function( responses ){
                responses.forEach( function(response){
                  $rootScope.nodes.push( new Node( response.data.result ) );
                });
              });
          });
      }

      $scope.loadNode = function(nodeId){
        return $http.get('/api/nodes/'+nodeId)
      }

      $scope.rootNodes = [];
      
      $scope.$watchCollection( 'nodes', function(newNodes, oldNodes){
        $scope.rootNodes = $rootScope.nodes.filter( function(node){
          return node.parents.length == 0;
        });
      });

      $scope.loadNodes();

      // angular-ui-tree methods
      $scope.remove = function(scope) {
        scope.remove();
      };

      $scope.toggle = function(scope) {
        scope.toggle();
      };

      $scope.newSubItem = function(scope) {
        var node = scope.$nodeScope.$modelValue;
        node.addChild({ Name: 'Invite me to the interview!' })
      };

    });

})();
