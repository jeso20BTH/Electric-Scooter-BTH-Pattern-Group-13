[![Build](https://github.com/jeso20BTH/pattern-user-webbclient/actions/workflows/testing.yml/badge.svg)](https://github.com/jeso20BTH/pattern-user-webbclient/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/jeso20BTH/pattern-user-webbclient/branch/main/graph/badge.svg?token=YOSC1TFXCB)](https://codecov.io/gh/jeso20BTH/pattern-user-webbclient)
[![Maintainability](https://api.codeclimate.com/v1/badges/a3305e6f9efcbee72215/maintainability)](https://codeclimate.com/github/jeso20BTH/pattern-user-webbclient/maintainability)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# Introduction
This application is a part of a system for handle electric scooters. It was made for the course Webbased frameworks and design patterns at [BTH](https://www.bth.se/). It is made as an group work with different members contribute with different parts of the system.

# Techniques
This application is with [Cordova](https://cordova.apache.org/), which makes running it able just with these simple commands.
- ```npm run browser``` Which will run the application in the browser

As an framework it run on [Mithril](https://mithril.js.org/), which is an lightweight, client-side framework for an single page application.   
To compile the code to it's production and develop state webpack is used for the JavaScript code and for the CSS is SASS used to compile the SCSS files.

# Views
This part of the document will cover the different views of the application.

## Welcome page
This is the startup view of the program.

### Not verified
![Welcome not logged in](https://raw.githubusercontent.com/jeso20BTH/pattern-user-webbclient/main/git_images/welcome_not_logged_in.png?raw=true)  
When you visit the site but are not verified this is the page that will show for you.

### Verified
![Welcome](https://raw.githubusercontent.com/jeso20BTH/pattern-user-webbclient/main/git_images/welcome.png?raw=true)  
This is the page you are welcomed with once you are logged in.

## Login
![Login](https://raw.githubusercontent.com/jeso20BTH/pattern-user-webbclient/main/git_images/login.png?raw=true)  
The login screen powered by OAuth.

## Invoices
![Invoices](https://raw.githubusercontent.com/jeso20BTH/pattern-user-webbclient/main/git_images/invoices.png?raw=true)  
An overview of your invoices.

### Invoice
![Invoices part 1](https://raw.githubusercontent.com/jeso20BTH/pattern-user-webbclient/main/git_images/invoice_part1.png?raw=true)
![Invoices part 2](https://raw.githubusercontent.com/jeso20BTH/pattern-user-webbclient/main/git_images/invoice_part2.png?raw=true)  
One invoice.

## History
![History](https://raw.githubusercontent.com/jeso20BTH/pattern-user-webbclient/main/git_images/history.png?raw=true)  
The history over your travels.

### Trip
![Trip map](https://raw.githubusercontent.com/jeso20BTH/pattern-user-webbclient/main/git_images/trip_map.png?raw=true)
![Trip info](https://raw.githubusercontent.com/jeso20BTH/pattern-user-webbclient/main/git_images/trip_info.png?raw=true)  
The information about one of your trips.  

## User
![User](https://raw.githubusercontent.com/jeso20BTH/pattern-user-webbclient/main/git_images/user.png?raw=true)  
The page with information about the user and the cities.
