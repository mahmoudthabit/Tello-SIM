# Tello-SIM

# Tello Command SIM

Tello Command SIM is an application writen in javascript to simulate the Tello drone command experience 

## Installation
Node is required for this application

You also can control the sim using any other language as long as you can use get requests. if you are going to use python an example of a client file is provided.

you will need a chrome extension to allow other programs to communicate with the web page. [Allow CORS: Access-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)

Navigate to the project folder and run  
```bash
npm install
```
After everything is installed successfully, run the application
```bash
node server.js 
```
Go to chrome browser and got to http://localhost:portNumber/ by default it is 3040 so 
```bash
http://localhost:3040/
```

if you are going to use python to communicate with the SIM you will need to install the requests library 
```bash
pip install requests
```

you can try using the client.py file by navigating to the folder where it is located and running it with
```bash
py client.py
``` 

Note: the post may be used by a different application so you will have to change the port number manually in the server.js, /public/sketch.js, and in the client.py
