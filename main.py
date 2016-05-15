from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'get sauced bruh'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/session/<token>')
def session():
    return render_template('session.html')

@app.route('/join')
def join():
    return render_template('join.html')

@app.route('/create')
def create():
    return render_template('create.html')

if __name__ == '__main__':
    socketio.run(app)
