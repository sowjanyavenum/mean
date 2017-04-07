# Retail app Sample

This application demonstrates a simple, reusable Node.js web application based on the Express,Nodejs framework having Angular js as front end framework and Mongodb as database layer and the whole app is deployed into cloud namely Bluemix .


This repo contains the code for a RESTful API Contact List App that was built using the MEAN stack:

MongoDB
Express
AngularJS
NodeJS

Instructions:
npm will now pull in all the packages defined into a node_modules folder in our project.

npm is Node’s package manager that will bring in all the packages we defined in package.json. Simple and easy. Now that we have our packages, let’s go ahead and use them when we set up our API.

We’ll be looking to our server.js file to setup our app since that’s the main file we declared in package.json.
install the Node modules with
npm install
then make sure MongoDB is running with
mongod
from your MongoDB directory, and then run the code with
node server
/retaillist/
Method	Description
GET	        Find all contacts
POST	        Create a new contact
/retaillist/:id
Method	Description
GET	       Find a single contact by ID
PUT	       Update entire contact document
DELETE	 Delete a contact by ID


Running the app on Bluemix
Open the manifest.yml file and change the host value to something unique. The host you choose will determinate the subdomain of your application's URL: samplenodeapp.mybluemix.net

Connect to Bluemix in the command line tool and follow the prompts to log in.

$ cf api https://api.ng.bluemix.net
$ cf login
Create the Compose for MongoDB service in Bluemix if you haven't already done so.
$ cf create-service compose-for-mongodb Standard my-compose-for-mongodb-service
Bind the service to the application.
$ cf bind-service samplenodeapp my-compose-for-mongodb-service
Push the app to Bluemix. When you push the app it is bound to the service specified in the manifest file.
$ cf push
Now when you visit samplenodeapp.mybluemix.net/ you will be able to view the contents of your MongoDB collection.