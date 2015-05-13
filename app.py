from flask import Flask, request, send_from_directory
from flask.ext.restful import reqparse, abort, Api, Resource, fields,\
    marshal_with
from flask_restful_swagger import swagger

from results_api import NodeList
from results_api import NodeItem

app = Flask(__name__)

###################################
# This is important:
api = swagger.docs(Api(app), apiVersion='0.1',
                   basePath='http://localhost:5000',
                   resourcePath='/',
                   produces=["application/json", "text/html"],
                   api_spec_url='/api/spec',
                   description='A Basic API')
###################################

api.add_resource(NodeList, '/api/nodes')
api.add_resource(NodeItem, '/api/nodes/<result_id>')

@app.route('/')
def index(name=None):
    return send_from_directory('templates', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)

