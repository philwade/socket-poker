from flask import Flask, render_template, session
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'get sauced bruh'
app.debug = True
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app)
