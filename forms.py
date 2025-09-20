from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, EmailField, SelectField, SubmitField
from wtforms.validators import DataRequired, Email, Length

class ContactForm(FlaskForm):
    name = StringField('Full Name', validators=[DataRequired(), Length(min=2, max=100)])
    email = EmailField('Email Address', validators=[DataRequired(), Email()])
    company = StringField('Company Name', validators=[Length(max=100)])
    phone = StringField('Phone Number', validators=[Length(max=20)])
    service = SelectField('Service Interest', choices=[
        ('', 'Select a service...'),
        ('it-consulting', 'IT Consulting'),
        ('staff-augmentation', 'Staff Augmentation'),
        ('cloud-solutions', 'Cloud Solutions'),
        ('cybersecurity', 'Cybersecurity'),
        ('digital-transformation', 'Digital Transformation'),
        ('managed-services', 'Managed IT Services')
    ])
    message = TextAreaField('Message', validators=[DataRequired(), Length(min=10, max=1000)])
    submit = SubmitField('Send Message')

class NewsletterForm(FlaskForm):
    email = EmailField('Email Address', validators=[DataRequired(), Email()])
    submit = SubmitField('Subscribe')
