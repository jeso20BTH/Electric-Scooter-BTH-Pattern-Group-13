# About
An compeate runable system for runablesystem for manage of electric scooters through docker.

# Setting up the system
1. Download `docker-compose.yml`
2. Make sure the following ports are open for port-forwarding
    - 666 - OAuth
    - 1337 - API
    - 1338 - API for simulation
    - 8000 - Mobile application
    - 8020 - Webbclient for client
    - 8040 - Webbclient for admin
3. To run the services run the following command `docker-compose up -d`
4. If you like to run an simulation with all 1000 bikes, run `docker-compose run -d simulation`

# Access clients
Bellow is a guide to were you can find the different clients

## Mobile application
Mobile application can be found at [localhost:8000](http://localhost:8000) and uses oauth though github as verification.

## Admin
Admin can be found at [localhost:8040](http://localhost:8040) and uses oauth though github as verification.

## Webbclient
Webbclient can be found at [localhost:8020](http://localhost:8020) and uses oauth though github as verification.
