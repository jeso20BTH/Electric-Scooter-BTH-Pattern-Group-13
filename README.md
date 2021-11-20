# Introduction
This application is a part of a system for handle electric scooters. It was made for the course Webbased frameworks and design patterns at [BTH](https://www.bth.se/). It is made as an group work with different members contribute with different parts of the system.

# Techniques
This application is with [Cordova](https://cordova.apache.org/), which makes running it able just with these simple commands.
```npm run browser``` Which will run the application in the browser
```npm run android``` Which will run the application in an android emulator or connected android phone.

As an framework it run on [Mithril](https://mithril.js.org/), which is an lightweight, client-side framework for an single page application.   
To compile the code to it's production and develop state webpack is used for the JavaScript code and for the CSS is SASS used to compile the SCSS files.

# Setup
1. Download the repo ```Insert comand to pull the repo```
2. Create ```www/js/models/config.json``` in it enter the client ID for the oauth service that you run, the OAuth client for this system can be found in this [main repo](https://github.com/jeso20BTH/Electric-Scooter-BTH-Pattern-Group-13).

# Views
This part of the document will cover the different views of the application.

## Login
![Login](https://raw.githubusercontent.com/jeso20BTH/pattern-user-app/main/git_images/login.png?raw=true)
This is the startup screen of the program, as you can see this application uses authorization through OAuth with github as authorization type.

## Rent
![Rent](https://raw.githubusercontent.com/jeso20BTH/pattern-user-app/main/git_images/rent_screen.png?raw=true)
When you are logged in to the application you face the screen where you are able to rent an electric scooter. You will be left with the choices of manually entering the id of the scooter or scan an QR-code by the plugin that Cordova offers.

## In rent
![in rent](https://raw.githubusercontent.com/jeso20BTH/pattern-user-app/main/git_images/in_rent.png?raw=true)
When you have rented an electric scooter you will be on the screen with information about how long your trip has been, the status of the bicycle battery. You also are given the choice to return the bicycle.

## User
![User](https://raw.githubusercontent.com/jeso20BTH/pattern-user-app/main/git_images/user_page.png?raw=true)
This page will show some useful information about the user, like it's balance.
