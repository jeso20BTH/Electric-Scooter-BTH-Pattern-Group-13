[![Build](https://github.com/jeso20BTH/bikerental-simulation/actions/workflows/testing.yml/badge.svg)](https://github.com/jeso20BTH/bikerental-simulation/actions/workflows/testing.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# About
An program for simulation of bicycles running. It is part of the system for the course Pattern at BTH.

## How does it work
1. It creates 1000 users and 1000 bicycles
2. Every second does it call the method to rent an bike
    - When the bike is rented first it creates an instans of the bike
    - Step two is to start the bike and override the GPS on the bike
    - Step three is to give it an start and stop position
    - From above positions does the steps to simulate movement get created
    - Starts the method to update the bike once every minute
