import uuid
from flask import render_template, session, redirect, url_for
from flask_socketio import emit, join_room, leave_room
from forms import CreateSessionForm
from helpers import getSessionVars, init_app

app, socketio = init_app(True)
# this is not really safe, just wanted to imitate a persistence layer
# TODO: implement a real persistence layer
sessions = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/create', methods=['GET', 'POST'])
def create_or_join():
    form = CreateSessionForm()

    if form.validate_on_submit():
        poker_session = sessions.get(form.sessionName.data)
        if poker_session is None:
            poker_session = { 'people': {} }
            sessions[form.sessionName.data] = poker_session

        uid = uuid.uuid4()
        poker_session['people'][str(uid)] = { 'username': form.username.data, 'role': form.role.data, 'vote': '' }
        session['sessionName'] = form.sessionName.data
        session['username'] = form.username.data
        session['role'] = form.role.data
        session['userId'] = uid
        return redirect(url_for('view_session', token=form.sessionName.data))

    return render_template('create.html', form=form)

@app.route('/session/<token>')
def view_session(token):
    poker_session = sessions.get(token)
    name, user, role, uid = getSessionVars()
    if poker_session is None or name is None or user is None or name != token:
        return redirect(url_for('create_or_join'))

    print poker_session
    return render_template('session.html', role=role, poker_session=poker_session)

@socketio.on('connect', namespace='/session')
def joined():
    name, user, role, uid = getSessionVars()
    join_room(name)
    emit('joined', { 'user': user, 'id': uid, 'role': role }, room=name)

@socketio.on('chat-message', namespace='/session')
def chat_message(message):
    name, user, role, uid = getSessionVars()
    emit('chat-message', { 'message': message, 'user': user }, room=name)

@socketio.on('set-topic', namespace='/session')
def set_topic(topic):
    name, user, role, uid = getSessionVars()
    poker_session = sessions.get(name)
    if role != 'admin' or poker_session is None:
        return;

    poker_session['topic'] = topic
    emit('set-topic', topic, room=name)

@socketio.on('vote', namespace='/session')
def vote(points):
    name, user, role, uid = getSessionVars()
    poker_session = sessions.get(name)
    if role != 'player' or poker_session is None:
        return;

    poker_session['people'][uid]['vote'] = points
    emit('vote', { 'points': points, 'user': user, 'id': uid }, room=name)

@socketio.on('show-votes', namespace='/session')
def show_votes():
    name, user, role, uid = getSessionVars()
    if role != 'admin':
        return;

    emit('show-votes', room=name)

@socketio.on('clear-votes', namespace='/session')
def clear_votes():
    name, user, role, uid = getSessionVars()
    poker_session = sessions.get(name)
    if role != 'admin' or poker_session is None:
        return;

    for uid, person in poker_session['people'].items():
        person['vote'] = ''

    emit('clear-votes', room=name)


if __name__ == '__main__':
    socketio.run(app)
