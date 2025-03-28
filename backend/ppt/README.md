# Deck_Slider Project

This is a Django-based project for managing slides. It includes a RESTful API that allows creating, updating, deleting, and retrieving slides using Django REST Framework (DRF). Each slide contains content such as a title, subtitle, body, image, and theme settings (e.g., background color, text color, font sizes).

## Features

- **CRUD Operations**: Create, Read, Update, and Delete slides.
- **Image Uploads**: Upload images for each slide.
- **Custom Theme**: Customize the background color, text color, and font sizes for each slide.
- **API Documentation**: Accessible endpoints for managing slides using Django REST Framework.

## Technologies Used

- **Django**: A high-level Python web framework that encourages rapid development and clean, pragmatic design.
- **Django REST Framework (DRF)**: A powerful toolkit for building Web APIs.
- **SQLite**: The default database used in the development environment.
- **Whitenoise**: Used to serve static files in production.

## Installation

Follow these steps to get the project up and running:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ppt-project.git
cd ppt-project

# Install virtualenv if not already installed
pip install virtualenv

# Create a virtual environment
virtualenv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# 
pip install -r requirements.txt

# Configure environment variables

Create a .env file (or manually set the settings) to configure the following settings:

SECRET_KEY: Keep this secret in production.

DEBUG: Set to True in development, False in production.

ALLOWED_HOSTS: List of allowed hosts for production.

# Apply migrations to set up the database
python manage.py migrate

#  Create a superuser (optional)
python manage.py createsuperuser

# Run the development server
python manage.py runserver


# API Endpoints
The following endpoints are available:

GET /api/slides/ - List all slides.

POST /api/slides/ - Create a new slide.

GET /api/slides/{id}/ - Retrieve a specific slide by ID.

PUT /api/slides/{id}/ - Update a slide by ID.

DELETE /api/slides/{id}/ - Delete a slide by ID.

# Example of Slide Data:
{
    "title": "Sample Slide Title",
    "subtitle": "Sample Slide Subtitle",
    "body": "This is the body content of the slide.",
    "image": "image_file.jpg",
    "theme": {
        "backgroundColor": "#FFFFFF",
        "textColor": "#000000",
        "fontSizes": {
            "title": "2rem",
            "subtitle": "1.5rem",
            "body": "1rem"
        }
    }
}


# Static and Media Files
# Static Files
Static files (CSS, JavaScript, etc.) are collected in the staticfiles directory during production. In development, they are served from the static directory.

# Media Files
Media files (e.g., images) are uploaded to the media/ directory. Make sure to properly configure media files in your production environment.


# CORS Configuration
CORS headers are configured to allow cross-origin requests from the following origins (you can add more based on your frontend setup):

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://localhost:3039"
]

