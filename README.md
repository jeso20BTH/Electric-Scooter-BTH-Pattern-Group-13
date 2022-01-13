[![Build](https://github.com/jeso20BTH/pattern-bike/actions/workflows/testing.yml/badge.svg)](https://github.com/jeso20BTH/pattern-bike/actions/workflows/testing.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

# About
An client made by a class for an bike. It is part of the system for the cours Pattern at BTH. It has the following attributes and methods.

## Attributes
`id` - the id of the bicycle  
`available` - 1 if able to rent, 0 if occupied  
`velocity` - the speed of the bike  
`battery` - the percentage of battery the bicycle has, 100 is max 0 and 0 is minimum  
`xcoord` - the latitude position of the bicycle  
`ycoord` - the longitude position of the bicycle  
`previousXCoord` - the previous latitude position of the bicycle
`previousYCoord` - the previous longitude position of the bicycle
`cityid` - id of the city the bicycle is in  
`gps` - checks if the bicycle should use its GPS  
`lightcolor` - the color of the lights on the bicycle. Green = free, red = charging, blue = riding  
`startIntervall` - the interval that send the bikes position  
`charging` - true if charging else false  
`updateFrequency` - how often the bicycle sends its position  

## Methods
`start` - start sending its position  
`stop` - stop sending its position  
`send` - method for sending position  
`setPosition` - set the position of the bicycle  
`getPosition` - get the position of the bicycle  
`calculateVelocity` - calculate speed with help of current eand previous position  
`overrideGPS` - turn of the GPS  
`checkBattery` - check if the battery capacity is 0  
`drainBattery` - while start is running drain battery 1 percent on each interval  
`chargeBattery` - increase battery 1 percent on each interval while battery is charging  
`checkCharger` - check if bike is in charger  
