<<<<<<< HEAD
SheetMaster 📊🚀

A web-based spreadsheet application built using Django, JavaScript, and Bootstrap.
It allows users to create, edit, save, and manage spreadsheets, mimicking the core functionalities of Google Sheets.

📌 Features

✅ User Authentication (Signup/Login/Logout)
✅ Create, Save, and Load Spreadsheets
✅ Edit Cells & Apply Formulas (SUM, AVERAGE, MAX, etc.)
✅ Bold, Italic, Underline Formatting
✅ Add/Remove Rows & Columns
✅ Remove Duplicates, Find & Replace
✅ Drag and Drop Cell Content
✅ REST API for Saving & Retrieving Sheets
✅ Responsive & Modern UI with Bootstrap

🚀 Tech Stack

🔹 Backend: Django + Django REST Framework (DRF)
🔹 Frontend: JavaScript + Bootstrap
🔹 Database: SQLite (can be extended to PostgreSQL)
🔹 Deployment: Hosted on Circumeo
🔹 Version Control: GitHub

📂 Installation & Setup

🔧 1. Clone the Repository
git clone https://github.com/adnan-1010/SheetMaster.git
cd SheetMaster
📦 2. Create and Activate a Virtual Environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
📜 3. Install Dependencies
pip install -r requirements.txt
🛠️ 4. Apply Database Migrations
python manage.py makemigrations
python manage.py migrate
🔑 5. Create a Superuser (For Admin Panel Access)
python manage.py createsuperuser
🚀 6. Run the Development Server
python manage.py runserver
🔒 Security Enhancements

✔️ CSRF Protection Enabled
✔️ Authentication Required for Sheets Access
✔️ User-Specific Data Isolation
✔️ Secure Password Hashing using Django Auth

🚀 Performance Enhancements

✔️ AJAX-based updates to avoid full-page reloads
✔️ Optimized database queries for fast data retrieval
✔️ Minified Static Files for Faster Load Times

=======
# SheetMaster

A Google Sheets-like web application built with Django and JavaScript.

## Features

- User authentication (signup/login)
- Create and manage spreadsheets
- Real-time cell editing
- Cell formatting (bold, italic, underline, font size, color)
- Formula support
- Auto-sum functionality
- Cell merging
- Sort ranges
- Conditional formatting
- Duplicate handling
- Automatic saving

## Project Structure

```
SheetMaster/
├── accounts/                 # User authentication app
├── sheets/                   # Spreadsheet functionality app
├── static/                   # Static files
│   └── js/
│       └── spreadsheet.js    # Spreadsheet JavaScript
├── templates/               # HTML templates
│   ├── registration/        # Auth templates
│   └── sheets/             # Spreadsheet templates
└── sheetmaster/            # Project settings
```

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

5. Run the development server:
```bash
python manage.py runserver
```

6. Visit http://127.0.0.1:8000 in your browser

## Usage

1. Sign up for a new account or log in
2. Create a new spreadsheet from the dashboard
3. Use the toolbar to format cells and perform operations
4. Changes are automatically saved
5. Access your spreadsheets anytime from the dashboard

## File Descriptions

- `accounts/views.py`: User authentication views
- `sheets/models.py`: Spreadsheet data model
- `sheets/views.py`: Spreadsheet functionality views
- `static/js/spreadsheet.js`: Client-side spreadsheet functionality
- `templates/sheets/spreadsheet.html`: Main spreadsheet interface
- `templates/sheets/dashboard.html`: User dashboard
- `templates/registration/`: Login/signup templates

## Development

To add new features or modify existing ones:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Requirements

- Python 3.8+
- Django 5.1.6
>>>>>>> 477347d (Initial commit)
