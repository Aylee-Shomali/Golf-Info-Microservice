# Golf Information Microservice
Created for OSU Computer Science course: CS361 Software Engineering I.

How to request data from the Golf Information Microservice.

Make a HTTP GET request to one of the following routes to get different types of data.
You may run the microservice locally on a specified port which would then comprise the first part of the request URL.
Ex: http://localhost:PORT/getAllTours

1. /getAllTours.
    - Get information on all available golf tours.

2. /getTopTenProjected
    - Get top 10 projected golfers in current PGA championship.

3. /getTopTen
    - Get top 10 Golfers in current PGA championship.

Please note: since this microservice utilizes the Golf-Leaderboard API from Rapid API, to use these routes, you must already have a rapid-api-key and rapid-api-host in order to use it.
If not, I can send mine to you if necessary.

For an example of requesting data from the miccroservice using the Fetch API, take at a look at the sample code provided in the SamplePageToRequestData folder.

# UML Diagrams:

![Sequence Diagram_ Golf Info Microservice Top10Projected](https://user-images.githubusercontent.com/114051913/198855348-d38d6270-cddc-4816-869c-888176e949a0.png)
![Sequence Diagram_ Golf Info Microservice GetAllTours](https://user-images.githubusercontent.com/114051913/198855349-cfb55071-5aaa-433d-8e62-b56b20fea5cb.png)
![Sequence Diagram_ Golf Info Microservice GetTop10](https://user-images.githubusercontent.com/114051913/198855350-e3fcfea1-f4be-4c16-9e13-c9edc048a61a.png)
