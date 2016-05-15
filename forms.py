from flask_wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class CreateForm(Form):
    name = StringField('Session Name', validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired()])
    submit = SubmitField('Create Session')

