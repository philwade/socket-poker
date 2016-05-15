from flask import Flask, render_template, session
from flask_socketio import SocketIO
from forms import CreateForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'get sauced bruh'
app.debug = True
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/session/<token>')
def session(token):
    return render_template('session.html')

@app.route('/join')
def join():
    return render_template('join.html')

@app.route('/create', methods=['GET', 'POST'])
def create():
    form = CreateForm()

    if form.validate_on_submit():
        session['name'] = form.name.data
        session['username'] = form.username.data
        return redirect(url_for('session', form.name.data))

    return render_template('create.html', form=form)

if __name__ == '__main__':
    socketio.run(app)
