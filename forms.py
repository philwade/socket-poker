from flask_wtf import Form
from wtforms import StringField, SubmitField, SelectField
from wtforms.validators import DataRequired

class CreateSessionForm(Form):
    sessionName = StringField('Session Name', validators=[DataRequired(message="required")])
    username = StringField('Display Name', validators=[DataRequired(message="required")])
    role = SelectField('Role', choices=[('player', 'player'), ('observer', 'observer'), ('admin', 'admin')], validators=[DataRequired(message="required")])
    submit = SubmitField('Create or Join Session')
