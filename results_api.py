from flask.ext.restful import Resource, Api
from flask_restful_swagger import swagger
from flask import json
import config
import os

json_root = os.path.join( config.app_root(), 'json' )
    
class NodeList(Resource):
    """NodeList API
    Provides a getter to retrieve all nodes
    """
    @swagger.operation(
        notes='get all nodes',
    )
    def get(self):
        # filename = "%s/json/%s" % APP_ROOT, resource_id
        return { "nodes": self.__collect_json_files() }

    def __collect_json_files(self):
        results = []
        for subdir, dirs, files in os.walk( json_root ):
            for file in files:
                results.append( file )
                # f.close()
        return results

class NodeItem(Resource):
    """NodeItem API
    Provides methods to CRUD a node item.
    """

    @swagger.operation(
        notes='get node by id'
    )

    def get(self,result_id):
        filename = os.path.join( json_root, result_id )
        if not filename.rsplit('.')[0] != 'json':
            filename += '.json'
        f = open( filename, 'r' )
        result = json.loads( f.read() )
        result['id'] = result_id
        return result
