# Video Rental App

A REST web app, which allows users to interact with a live database and rent movies based on genres.

## Deploying the website on heroku

```
https://guarded-plateau-75943.herokuapp.com

```

## For the live demo, please watch the video titled Demo.mp4

## Routes or API endpoints
```
POST to https://guarded-plateau-75943.herokuapp.com/api/users/ to create a new user in the db, with name, email, password fields defined in body of the request. The response contains a token id which we can then include in our req headers as an authorization token.

POST to https://guarded-plateau-75943.herokuapp.com/api/genres/ with name:genre field in body f req, and the above received auth token in header, to create a genre resource in the db.
```

## Other routes can be found in:-
```
./startup/routes
```
Clone the repository:

```
git clone https://github.com/ishanmadan1996/Video_Rental_REST_App.git
```

Install the pre-requisite libraries from:

```
package.json
```

## Built With

* [NodeJs](https://nodejs.org/en/docs/)
* [Express](https://expressjs.com/)

## Authors

* **Ishan Madan** - (https://github.com/ishanmadan1996)