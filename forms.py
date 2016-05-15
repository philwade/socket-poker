from flask_wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class CreateForm(Form):
    sessionName = StringField('Session Name', validators=[DataRequired(message="required")])
    username = StringField('Username', validators=[DataRequired(message="required")])
    submit = SubmitField('Create Session')

