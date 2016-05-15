from flask_wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class CreateForm():
    name = StringField('name', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
    submit = SubmitField('Create Session')

