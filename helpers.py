from flask import Flask, session
from flask_socketio import SocketIO

def init_app(debug=False):
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'get sauced bruh'
    app.debug = debug

    return app, SocketIO(app)

def getSessionVars():
    return session.get('sessionName'), session.get('username'), session.get('role'), str(session.get('userId'))
