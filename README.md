# Notes UI and API

This project UI was created with CRA, css modules, Context API. \
This project API was created with Node.js + express. \
Project database is Sqlite. 

## To run API
go to `./api` directory \
file database.sqlite can be deleted, it stays only as example. \
after running API it creates new db if not exists

### `npm i` for packages
### `node app.js` for run api



## To work with UI
go to `./web` directory 

create .env file with REACT_APP_API_URL=http://localhost:5000

### `npm i` for packages
### `npm start` for run app
Runs the app in the development mode.\
Open http://localhost:3000 to view it in your browser.


### Deployment

npm install -g serve \
serve -s build
