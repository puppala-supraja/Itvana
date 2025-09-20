# ITVANAA - IT Consulting Website

## Overview

ITVANAA is a professional IT consulting website built with Flask that showcases services, provides contact functionality, and includes a blog system. The application serves as a business website for an IT consulting company offering services like IT consulting, staff augmentation, cloud solutions, and cybersecurity.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Template Engine**: Jinja2 templates with Bootstrap 5 for responsive design
- **CSS Framework**: Bootstrap 5 with custom CSS styling
- **JavaScript**: Vanilla JavaScript for interactive features
- **Static Assets**: CSS and JavaScript files served through Flask's static file handling

### Backend Architecture
- **Framework**: Flask web framework
- **Database ORM**: SQLAlchemy with Flask-SQLAlchemy extension
- **Form Handling**: Flask-WTF with WTForms for form validation
- **Security**: CSRF protection enabled globally
- **Email System**: Flask-Mail for sending emails

## Key Components

### Database Models
- **ContactSubmission**: Stores contact form submissions with fields for name, email, company, phone, service interest, and message
- **NewsletterSubscription**: Manages email subscriptions with active/inactive status
- **BlogPost**: Content management for blog posts with title, slug, content, and publishing status

### Forms
- **ContactForm**: Handles business inquiries with validation for name, email, company, phone, service selection, and message
- **NewsletterForm**: Simple email subscription form

### Routes and Views
- **Home Page** (`/`): Landing page with hero section and company overview
- **Services** (`/services`): Service listing page
- **Service Details** (`/services/<service_name>`): Individual service pages
- **About** (`/about`): Company information page
- **Blog** (`/blog`): Blog listing page
- **Contact** (`/contact`): Contact form page
- **Error Pages**: Custom 404 and 500 error pages

## Data Flow

1. **User Interaction**: Users navigate through the website and interact with forms
2. **Form Submission**: Contact and newsletter forms are processed server-side
3. **Database Storage**: Form submissions are stored in SQLite database
4. **Email Notifications**: Contact form submissions trigger email notifications via Flask-Mail
5. **Response**: Users receive confirmation messages and are redirected appropriately

## External Dependencies

### Python Packages
- **Flask**: Web framework
- **Flask-SQLAlchemy**: Database ORM
- **Flask-WTF**: Form handling and CSRF protection
- **Flask-Mail**: Email functionality
- **WTForms**: Form validation
- **Werkzeug**: WSGI utilities including ProxyFix middleware

### Frontend Dependencies
- **Bootstrap 5**: CSS framework via CDN
- **Font Awesome**: Icons via CDN
- **Custom CSS**: Additional styling in `static/css/style.css`
- **Custom JavaScript**: Interactive features in `static/js/main.js`

### External Services
- **Email Provider**: Configurable SMTP server (defaults to Gmail)
- **Image Assets**: Pixabay images for visual content

## Deployment Strategy

### Configuration
- **Environment Variables**: Database URL, mail settings, and session secrets
- **Database**: SQLite for development, configurable for production
- **Session Management**: Secret key from environment variables
- **Proxy Support**: ProxyFix middleware for reverse proxy deployments

### Database Setup
- **Auto-initialization**: Database tables are created automatically on app startup
- **Connection Pooling**: Configured with pool recycling and pre-ping for reliability

### Email Configuration
- **SMTP Settings**: Configurable mail server, port, and authentication
- **Default Sender**: Configurable default email address for notifications
- **TLS Support**: Secure email transmission enabled

### Security Features
- **CSRF Protection**: Enabled globally for all forms
- **Input Validation**: Server-side validation for all user inputs
- **Error Handling**: Custom error pages for better user experience

The application is designed to be easily deployable with minimal configuration required, using environment variables for sensitive settings and providing sensible defaults for development.