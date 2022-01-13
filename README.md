# About
An complete runnable system for manage of electric scooters through docker.
it contains the following parts
- API [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Dundgren/bikerental-api/badges/quality-score.png?b=main)](https://scrutinizer-ci.com/g/Dundgren/bikerental-api/?branch=main)[![Build Status](https://app.travis-ci.com/Dundgren/bikerental-api.svg?branch=main)](https://app.travis-ci.com/Dundgren/bikerental-api)
- OAuth [![Build](https://github.com/jeso20BTH/pattern-oauth/actions/workflows/testing.yml/badge.svg)](https://github.com/jeso20BTH/pattern-oauth/actions/workflows/testing.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
- Bike [![Build](https://github.com/jeso20BTH/pattern-bike/actions/workflows/testing.yml/badge.svg)](https://github.com/jeso20BTH/pattern-bike/actions/workflows/testing.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
- Web-client for admin [![Build Status](https://scrutinizer-ci.com/g/haannaj/Pattern-project-scooter/badges/build.png?b=main)](https://scrutinizer-ci.com/g/haannaj/Pattern-project-scooter/build-status/main)
- Web client for customer[![Build](https://github.com/jeso20BTH/pattern-user-webbclient/actions/workflows/testing.yml/badge.svg)](https://github.com/jeso20BTH/pattern-user-webbclient/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/jeso20BTH/pattern-user-webbclient/branch/main/graph/badge.svg?token=YOSC1TFXCB)](https://codecov.io/gh/jeso20BTH/pattern-user-webbclient)
[![Maintainability](https://api.codeclimate.com/v1/badges/a3305e6f9efcbee72215/maintainability)](https://codeclimate.com/github/jeso20BTH/pattern-user-webbclient/maintainability)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
- App for customer [![Node.js CI](https://github.com/jeso20BTH/pattern-user-app/actions/workflows/testing.yml/badge.svg)](https://github.com/jeso20BTH/pattern-user-app/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/jeso20BTH/pattern-user-app/branch/main/graph/badge.svg?token=CP23P4OIEI)](https://codecov.io/gh/jeso20BTH/pattern-user-app)
[![Maintainability](https://api.codeclimate.com/v1/badges/9ab83e4b6945a935896f/maintainability)](https://codeclimate.com/github/jeso20BTH/pattern-user-app/maintainability)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
- Simulation [![Build](https://github.com/jeso20BTH/bikerental-simulation/actions/workflows/testing.yml/badge.svg)](https://github.com/jeso20BTH/bikerental-simulation/actions/workflows/testing.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# Setting up the system
1. Download `docker-compose.yml`
2. Make sure the following ports are open for port-forwarding
    - 666 - OAuth
    - 1337 - API
    - 1338 - API for simulation
    - 8000 - Mobile application
    - 8020 - Webbclient for customer
    - 8040 - Webbclient for admin
3. To run the services run the following command `docker-compose up -d`
4. If you like to run an simulation with all 1000 bikes, run `docker-compose run -d simulation`

# Access clients
Bellow is a guide to were you can find the different clients

## Admin
Admin can be found at [localhost:8040](http://localhost:8040) and uses oauth though github as verification.

## Mobile application
Mobile application can be found at [localhost:8000](http://localhost:8000) and uses oauth though github as verification.

## Webbclient
Webbclient can be found at [localhost:8020](http://localhost:8020) and uses oauth though github as verification.
