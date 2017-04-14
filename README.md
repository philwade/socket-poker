# socket-poker
A pointing poker clone in preact + redux

Socket poker consists of a frontend written with preact and redux and a backend written in node using the express framework. Websockets do most of the communication between the frontend and the backend. The backend uses mongo for data storage.

## Running the backend
* Switch into the frontend directory and run `npm install`
* Run `npm start`

You will have to restart the backend server every time you make a change. It is basically a pass through for data from socket to socket that persists things in mongo, so there isn't a ton to change.
## Running mongo
* Get a copy of mongo. You can use homebrew (`brew install mongo`) or the package manager of your choice.
* Run `mongod`

In dev mode the backend connects to localhost on the default mongo port. You can pass it a connection string if you want via the `CONNECTION` environment variable.

## Running the frontend
* Switch into the frontend directory and run `npm install`
* Run `npm run dev`

You should now be able to see pointing poker at http://0.0.0.0:8080. For reasons related to how websockets work, in local dev if you want to connect in multiple browser windows, you will need to run multiple instances of the frontend on different ports. You can do this by running `PORT=8081 npm run dev` where PORT is the port you'd like to run it on.
