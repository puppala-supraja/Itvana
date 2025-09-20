from flask import render_template, request, redirect, url_for, flash, jsonify
from flask_mail import Message
from app import app, mail
from forms import ContactForm, NewsletterForm
import logging
import os

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/services/<service_name>')
def service_detail(service_name):
    services_data = {
        'it-consulting': {
            'title': 'IT Consulting',
            'description': 'Strategic IT consulting to optimize your technology infrastructure and drive business growth.',
            'features': [
                'Technology Strategy Development',
                'Infrastructure Assessment',
                'Digital Transformation Planning',
                'Technology Roadmap Creation',
                'Cost Optimization Analysis',
                'Risk Assessment & Mitigation'
            ]
        },
        'staff-augmentation': {
            'title': 'Staff Augmentation',
            'description': 'Skilled IT professionals to augment your team and accelerate project delivery.',
            'features': [
                'Expert Developers & Engineers',
                'Project-based Resources',
                'Long-term Partnerships',
                'Rapid Scaling Capabilities',
                'Quality Assurance',
                'Seamless Integration'
            ]
        },
        'cloud-solutions': {
            'title': 'Cloud Solutions',
            'description': 'Comprehensive cloud services to modernize your infrastructure and enhance scalability.',
            'features': [
                'Cloud Migration Services',
                'Multi-cloud Strategy',
                'Cloud Architecture Design',
                'DevOps Implementation',
                'Cost Optimization',
                'Security & Compliance'
            ]
        },
        'cybersecurity': {
            'title': 'Cybersecurity',
            'description': 'Robust security solutions to protect your digital assets and maintain compliance.',
            'features': [
                'Security Assessment',
                'Threat Detection & Response',
                'Compliance Management',
                'Security Training',
                'Incident Response Planning',
                'Continuous Monitoring'
            ]
        },
        'digital-transformation': {
            'title': 'Digital Transformation',
            'description': 'End-to-end digital transformation services to modernize your business processes.',
            'features': [
                'Process Automation',
                'Legacy System Modernization',
                'Data Analytics & Insights',
                'Customer Experience Enhancement',
                'Mobile Solutions',
                'Integration Services'
            ]
        },
        'managed-services': {
            'title': 'Managed IT Services',
            'description': 'Comprehensive managed IT services to maintain and optimize your technology infrastructure.',
            'features': [
                '24/7 Monitoring & Support',
                'Proactive Maintenance',
                'Help Desk Services',
                'Network Management',
                'Backup & Recovery',
                'Performance Optimization'
            ]
        }
    }
    
    service = services_data.get(service_name)
    if not service:
        flash('Service not found.', 'error')
        return redirect(url_for('services'))
    
    return render_template('service_detail.html', service=service, service_name=service_name)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/blog')
def blog():
    # Sample blog posts - in a real application, these would come from a database
    blog_posts = [
        {
            'title': 'The Future of IT Consulting: Trends to Watch in 2025',
            'excerpt': 'Explore the emerging trends shaping the IT consulting landscape and how businesses can prepare for the future.',
            'date': '2025-01-15',
            'image': 'https://pixabay.com/get/g42c1431de6f9df6c99ab8d329671d5de8aaaf3cfb5aa921d6039e8b1f070a8f283b03fc12c2d27e2cd8c680db2ecaf52a40e918bb9abbd79dbdb636647861fd3_1280.jpg',
            'slug': 'future-of-it-consulting-2025'
        },
        {
            'title': 'Cloud Migration Best Practices for Enterprise Success',
            'excerpt': 'Learn the essential strategies and best practices for successful cloud migration in enterprise environments.',
            'date': '2025-01-10',
            'image': 'https://pixabay.com/get/ge08eb7dc35abd8c2af836a8126d5cc623838bce39046ba73ad0c009d47c6e78c56bde5c0e649aac07d47af6041ae9b0c63f93eafac84a8d136a55f73761d01f7_1280.jpg',
            'slug': 'cloud-migration-best-practices'
        },
        {
            'title': 'Cybersecurity in the Age of Remote Work',
            'excerpt': 'Discover how to maintain robust cybersecurity measures while supporting a distributed workforce.',
            'date': '2025-01-05',
            'image': 'https://pixabay.com/get/g4e9f67c611c2217cd46e806ae44753b1ed32a806c3f98de9ba8a9fa1e2b9314bcc6cc9fdd3c8e1d6b690c3e802b659f545c265b985ec72e54568088bb9be2cdf_1280.jpg',
            'slug': 'cybersecurity-remote-work'
        }
    ]
    return render_template('blog.html', posts=blog_posts)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm()
    if form.validate_on_submit():
        try:
            # Send email
            msg = Message(
                subject=f'New Contact Form Submission from {form.name.data}',
                recipients=[os.environ.get('CONTACT_EMAIL', 'puppalasupraja25@gmail.com')],
                body=f"""
                New contact form submission:
                
                Name: {form.name.data}
                Email: {form.email.data}
                Company: {form.company.data}
                Phone: {form.phone.data}
                Service Interest: {form.service.data}
                
                Message:
                {form.message.data}
                """
            )
            mail.send(msg)
            flash('Thank you for your message! We will get back to you soon.', 'success')
            return redirect(url_for('contact'))
        except Exception as e:
            logging.error(f"Error sending email: {e}")
            flash('There was an error sending your message. Please try again later.', 'error')
    
    return render_template('contact.html', form=form)

@app.route('/newsletter', methods=['POST'])
def newsletter():
    form = NewsletterForm()
    if form.validate_on_submit():
        try:
            # In a real application, you would save this to a database
            flash('Thank you for subscribing to our newsletter!', 'success')
        except Exception as e:
            logging.error(f"Error subscribing to newsletter: {e}")
            flash('There was an error subscribing. Please try again later.', 'error')
    
    return redirect(request.referrer or url_for('index'))

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500
