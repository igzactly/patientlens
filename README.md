PatientLens 

Project Overview

PatientLens is a healthcare-focused application designed to manage patient-related image data efficiently. This system provides functionalities to upload, retrieve, update, delete, and display images associated with patient diagnoses, all while ensuring security and privacy.

Key Features:

Multi-image upload functionality with images organized by patient and diagnosis.

Retrieval of images from the backend to display on the frontend in a dynamic carousel.

Secure handling of patient and diagnosis data with user-friendly interfaces.


Installation and Setup

Prerequisites

Python 3.7+

Flask

AngularJS

MySQL Setup 

Backend Setup

import the database from patientlens.sql file

Clone the repository in your work directory:

git clone https://github.com/igzactly/recruitease.git


Create a virtual environment and install dependencies:

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt


Directory Structure

├───admin
│   └───__pycache__
├───diagnosis
│   └───__pycache__
├───models
│   └───__pycache__
├───patient
│   └───__pycache__
├───payment
│   └───__pycache__
├───templates
│   └───includes
│       └───assets
│           ├───css
│           │   ├───custom
│           │   ├───extras
│           │   └───icons
│           │       ├───fontawesome
│           │       │   └───fonts
│           │       ├───glyphicons
│           │       ├───icomoon
│           │       │   └───fonts
│           │       └───summernote
│           ├───csvtemplate
│           ├───demo_data
│           │   ├───d3
│           │   │   ├───bars
│           │   │   ├───lines
│           │   │   └───pies
│           │   ├───dashboard
│           │   ├───dimple
│           │   ├───jquery_ui
│           │   ├───maps
│           │   │   └───vector
│           │   └───wizard
│           ├───fonts
│           │   └───custom
│           ├───images
│           │   ├───backgrounds
│           │   ├───brands
│           │   ├───doorStatus
│           │   ├───fingericons
│           │   └───flags
│           └───js
│               ├───app
│               ├───charts
│               │   ├───c3
│               │   ├───d3
│               │   │   ├───bars
│               │   │   ├───chords
│               │   │   ├───lines
│               │   │   ├───other
│               │   │   ├───pies
│               │   │   ├───sunburst
│               │   │   ├───tree
│               │   │   └───venn
│               │   ├───dimple
│               │   │   ├───area
│               │   │   ├───bars
│               │   │   ├───bubble
│               │   │   ├───lines
│               │   │   ├───pies
│               │   │   ├───rings
│               │   │   ├───scatter
│               │   │   └───step
│               │   ├───echarts
│               │   └───google
│               │       ├───bars
│               │       ├───bubbles
│               │       ├───lines
│               │       ├───other
│               │       ├───pies
│               │       └───scatter
│               ├───core
│               │   └───libraries
│               │       └───jquery_ui
│               │           └───globalize
│               │               └───cultures
│               ├───custom
│               │   └───jspdf
│               │       ├───dist
│               │       ├───docs
│               │       │   ├───scripts
│               │       │   │   └───prettify
│               │       │   └───styles
│               │       ├───examples
│               │       │   ├───annotation
│               │       │   ├───bootstrap
│               │       │   │   ├───css
│               │       │   │   ├───img
│               │       │   │   └───js
│               │       │   ├───canvg_context2d
│               │       │   ├───context2d
│               │       │   ├───css
│               │       │   │   └───smoothness
│               │       │   │       └───images
│               │       │   ├───html2pdf
│               │       │   │   └───images
│               │       │   ├───images
│               │       │   ├───js
│               │       │   │   └───jquery
│               │       │   └───outline
│               │       ├───libs
│               │       │   ├───canvg_context2d
│               │       │   │   └───libs
│               │       │   ├───Downloadify
│               │       │   │   ├───images
│               │       │   │   ├───js
│               │       │   │   ├───media
│               │       │   │   └───src
│               │       │   │       └───com
│               │       │   │           └───dynamicflash
│               │       │   │               └───util
│               │       │   │                   └───tests
│               │       │   ├───html2canvas
│               │       │   │   ├───dist
│               │       │   │   └───src
│               │       │   │       └───renderers
│               │       │   ├───png_support
│               │       │   └───require
│               │       ├───old-tests
│               │       │   └───libs
│               │       ├───plugins
│               │       └───tests
│               │           ├───acroform
│               │           │   └───reference
│               │           ├───addhtml
│               │           │   └───reference
│               │           ├───annotations
│               │           │   └───reference
│               │           ├───autoprint
│               │           │   └───reference
│               │           ├───init
│               │           │   └───reference
│               │           ├───pages
│               │           │   └───reference
│               │           ├───shapes
│               │           │   └───reference
│               │           ├───text
│               │           │   └───reference
│               │           └───utils
│               ├───includes
│               ├───maps
│               │   ├───google
│               │   │   ├───basic
│               │   │   ├───controls
│               │   │   ├───drawings
│               │   │   ├───layers
│               │   │   └───markers
│               │   └───vector
│               ├───notifications
│               ├───pages
│               └───plugins
│                   ├───buttons
│                   ├───editors
│                   │   ├───ace
│                   │   ├───summernote
│                   │   └───wysihtml5
│                   │       └───locales
│                   ├───extensions
│                   ├───forms
│                   │   ├───editable
│                   │   ├───inputs
│                   │   │   ├───alpaca
│                   │   │   └───typeahead
│                   │   ├───selects
│                   │   ├───styling
│                   │   ├───tags
│                   │   ├───validation
│                   │   └───wizards
│                   │       └───form_wizard
│                   ├───internationalization
│                   ├───loaders
│                   ├───maps
│                   │   └───jvectormap
│                   │       └───map_files
│                   │           └───countries
│                   ├───media
│                   ├───notifications
│                   ├───pagination
│                   ├───pickers
│                   │   ├───color
│                   │   ├───location
│                   │   └───pickadate
│                   ├───sliders
│                   ├───tables
│                   │   ├───datatables
│                   │   │   └───extensions
│                   │   │       ├───jszip
│                   │   │       └───pdfmake
│                   │   ├───footable
│                   │   └───handsontable
│                   ├───trees
│                   ├───ui
│                   │   ├───fullcalendar
│                   │   │   └───lang
│                   │   ├───headroom
│                   │   └───moment
│                   ├───uploaders
│                   │   ├───fileinput
│                   │   │   └───plugins
│                   │   └───plupload
│                   ├───velocity
│                   └───visualization
│                       ├───c3
│                       ├───d3
│                       ├───dimple
│                       └───echarts
│                           ├───chart
│                           └───theme
├───test
└───uploads
Technologies Used

Backend: Flask (Python)

Frontend: AngularJS

Database: MySQL (or other relational DBs)

Hosting: Localhost during development and can be deployed on any platform 


Contributions are welcome! Please follow the steps below:

Fork the repository.

Create a feature branch.

Commit your changes.

Push to the branch.

Open a pull request.



Contact

For any queries or issues, please contact:

Name: Ignatius Gonsalves

Email: ignatius128@gmail.com, k2439000@kingston.ac.uk

