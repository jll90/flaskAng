#!flask/bin/python
from flask import Flask, jsonify, make_response, request, render_template

app = Flask(__name__)

users = [
	{
		'id': 1,
		'name': 'michael'
	},
	{
		'id': 2,
		'name': 'antonio'
	},
	{
		'id': 4,
		'name': 'antonio2'
	}
]

@app.route('/')
def index():
	return render_template('home.html') 


@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)


@app.route('/api/v1.0/users', methods=["GET"])
def get_users():
	return jsonify({'users': users})


@app.route('/api/v1.0/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = [user for user in users if user['id'] == user_id]
    if len(user) == 0:
        abort(404)
    return jsonify({'user': user[0]}), 200

@app.route('/api/v1.0/users', methods=["POST"])
def create_user():
	if not request.json or not 'name' in request.json:
		abort(400)
	user = {
		'id': users[-1]['id'] + 1,
		'name': request.json['name'],

	}
	users.append(user)
	return jsonify({'user': user}), 201

@app.route('/api/v1.0/users/<int:user_id>', methods=['PUT'])
def update_task(user_id):
    user = [user for user in users if user['id'] == user_id]
    if len(user) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'name' in request.json and type(request.json['name']) != unicode:
        abort(400)
    
    user[0]['name'] = request.json.get('name', user[0]['name'])
    
    return jsonify({'users': users}), 200

@app.route('/api/v1.0/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
	user = [user for user in users if user['id'] == user_id]
	if len(user) == 0:
		abort(404)
	users.remove(user[0])
	return jsonify({'result': True}), 204



@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run(debug=True)


