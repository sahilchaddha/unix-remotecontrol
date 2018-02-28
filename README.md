# Unix Remote Control (WIP

Runs Scripts on Mac/Linux remotely.

### Why :

### How it Works :

## Installation :

```
 $ git clone https://github.com/sahilchaddha/unix-remoteControl.git && cd unix-RemoteControl
 $ npm install
 $ npm start
```

### Example :

## Configuration :

## Usage :

## Available Scripts/Commands : 

## Creating Custom Scripts :

## Homebridge :

### Running Forever on Rasberry Pi :


sockets

npm install -g forever
forever start src/server.js

node src/server.js

curl --header "token: f64f2940-fae4-11e7-8c5f-ef356f27913" localhost:3000/power


Mac Remote Control Server Running at localhost:3000.
Session Token = f64f2940-fae4-11e7-8c5f-ef356f279131


/shutdown?time=10
/restart
/halt
/logout
/sleep

/displaySleep
/ping


var env = {
    port: '3000',
    pass: 'uncharted',
    logLevel: 'info',
    sessionToken: 'f64f2940-fae4-11e7-8c5f-ef356f279131'
}



| Fields             | Description                                           | Required |
|--------------------|-------------------------------------------------------|----------|
| platform           | Must always be `cmdSwitch2`.                          | Yes      |
| name               | For logging purposes.                                 | No       |
| switches           | Array of switch config (multiple switches supported). | Yes      |
| \|- name\*         | Name of your device.                                  | Yes      |
| \|- on_cmd         | Command to turn on your device.                       | No       |
| \|- off_cmd        | Command to turn off your device.                      | No       |
| \|- state_cmd      | Command to detect an ON state of your device.         | No       |
| \|- polling        | State polling (Default false).                        | No       |
| \|- interval       | Polling interval in `s` (Default 1s).                 | No       |
| \|- timeout\*\*    | Commands execution timeout in `s` (Default 1s).       | No       |
| \|- manufacturer   | Manufacturer of your device.                          | No       |
| \|- model          | Model of your device.                                 | No       |
| \|- serial         | Serial number of your device.                         | No       |