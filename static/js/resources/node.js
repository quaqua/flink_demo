(function(){

  'use strict';

  angular.module('flink')
    .factory('Node', function($rootScope){


      /**
       * initialize a new Node with the given values
       */
      function Node( initValues ){

        for( var val in initValues )
          this[val] = initValues[val];

        var node = initValues.node;
        if( node )
          for( var val in node )
            this[val] = node[val];
  
        this.setupChildren();

      }

      /**
       * get the name of the current node
       *
       * this method returns a valid string in any way.
       */
      Node.prototype.getName = function(){
        return this.Name || 'Undefined Name';
      };

      /**
       * setup (and transform) all children of
       * this node into Node objects. This is required
       * in order to iterate with the ng-repeater over
       * the node's children
       */
      Node.prototype.setupChildren = function(){
        var childrenIds = this.children.map(function(child){ return child.id; });
        this.childNodes = $rootScope.nodes.filter(function(node){
          return childrenIds.indexOf(node.id) >= 0;
        }); 
      }

      /**
       * adds a new child to this node
       *
       * if no attributes are given, default attributes are
       * used.
       */
      Node.prototype.addChild = function(_attrs){
        _attrs = _attrs || {};
        var attrs = {
          "attribs": [
            "Info", 
            "Name", 
            "Type", 
            "Value"
          ], 
          "children": [], 
          "node": {
            "id": (new Date()).getTime().toString(),
            "Info": "TEMPLATE", 
            "Name": "TEMPLATE", 
            "Type": "TEMPLATE", 
            "Value": null
          }, 
          "parents": []
        };
        for(var attr in _attrs)
          attrs.node[attr] = _attrs[attr];
        this.childNodes.push( new Node(attrs) );
      };

      return Node;

    });

})();
