# SubwayAPI
API for representing a subway system. For the full design specification adheared to, please look in assignment.md.



## How to Run

First, make sure to have the following programs installed:
* [Docker-compose](https://docs.docker.com/compose/)
* [Make](https://sp21.datastructur.es/materials/guides/make-install.html)

After cloning the repository locally, run the following commands from the project root to build and start the containers:
```
make dockerbuild
make dockerup
```

Several other useful shortcuts have been provided in the makefile for ease of running commands inside the containers:
* `make psql` to start the psql client inside the postgres container
* `make test` to run the automated testing suite in the subwayapi container
* `make bash` to start a bash shell in the subwayapi container
* `make build` to execute a production build of the application


You can access the server by sending requests to `127.0.0.1:3000`



---------------------------------------

## Answers to Questions in assignment.md

* Does your code completely solve the questions?
    * Yes, this code completely solves the questions asked for both challenge 1 and challenge 2. Since Challenge 2 is an extension of challenge 1, they have both been implemented alongside eachother. The `findOptimalRoute` functionality is where the most liberty is taken as it considers the distance between every station to be the same, which in reality will not always be the case, so the shortest path is always the path with the fewest number of stops.

* Is your code organized and well thought-out?
    * The code is well organized and thought out well enough for the purpose of this assignment.

* Would it be easy to extend your code to a more complex solution with more requirements?
    * I believe it would be easy to extend the code to a more complex solution. The database is not setup with migrations to modify it at the moment, and is instead created using a single `create_tables.sql` script run on postgres container startup. If this code was to be extended the database creation should be moved to a proper migrations directory using an appropriate typescript package.

* How did you test your solution?  
    * There is a single unit testing file for one of the endpoints that serves as an example of how one might write tests for this code. For the sake of time not all of the functions are unit tested, but if this was to go into production then unit tests for all custom functions should be added. Beyond that the code was tested manually by making calls to the API via Postman. This is not a full proof way to test and it is definitely possible (i.e. more than likely) that there are some bugs lurking in the code still, but getting to complete automated testing code coverage is beyond the scope of this assignment in my opinion.

* How should this code be improved before going into production? (my own question)
    * Beyond what has already been mentioned about extending the testing suite and adding database migration handling, the code documentation could definitely be increased, and the error handling could use some work as well. Currently the errors sent to the user by the API are very low level and probably expose too much about the implementation. There may be some security vulnerabilities around SQL injection that should be paid attention too as well.
