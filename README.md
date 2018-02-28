# Unix Remote Control (WIP

Runs Scripts on Mac/Linux remotely.

## Why :

I was setting up homebridge (iOS HomeKit Accesory Protocol) on my rasberryPi and after hooking up my IR Blaster, RF Transmitter and other wake-on-lan devices. I wanted my always-on OSX to also be remotely controlled by my iOS Device. So i ended up writing up a small plugin for [Homebridge](https://github.com/nfarina/homebridge) [plugin](https://github.com/sahilchaddha/homebridge-unixControl). 

I use this to play itunes, search google and bookmark search results, restart my system, get room temperature using MBP in-build Temp Sensor and adjust airconditioning accordingly, monitor my ec-2 instance stats, sync Spotify Playlist etc.

Homebridge Plugin => [homebridge-unixControl](https://github.com/sahilchaddha/homebridge-unixControl)

## How it Works :

This library is directly injected into homebridge with a plugin wrapper => [homebridge-unixControl](https://github.com/sahilchaddha/homebridge-unixControl)

The plugin queries the system using HTTP API and run shell scripts. The shell requires sudo access to shutdown/reboot the system. More commands can be easily be injected. Feel free to PR.

## Todo :

- [ ] Replace HTTP API with socket connection.
- [ ] Implement a working Example
- [ ] Publish to NPM
- [ ] Security Concerns


## Installation :

```
 $ git clone https://github.com/sahilchaddha/unix-remoteControl.git && cd unix-RemoteControl
 $ npm install
```

### Starting Server :

```
$ npm start
```

### Running Forever

```
 $ npm install -g forever
 $ forever start src/server.js
```

## Configuration :

Configuration containing sudo password, port number, logLevel & sessionToken are stored in environment.js in root.

Sample Configuration :

``` 
//environment.js
var env = {
    port: '3000',
    pass: 'lol', //sudo password TODO: Secure
    logLevel: 'info',
    sessionToken: 'f64f2940-fae4-11e7-8c5f-ef356f279131'
}

module.exports = env
```

### Config Parameters


| Fields             | Description                                           |
|--------------------|-------------------------------------------------------|----------|
| port           | Port Number to run HTTP Server.                          |
| pass               | System Sudo Password                                 |
| logLevel           | Log Level (debug, info, error) |
| sessionToken         | Random Session Token for API Authentication.                                   |

`
Note:- sessionToken needs to be set as Request Header "token"
`

## Usage :

After Running the server, You can request

`localhost:portNumber/commandType/command?queryParams`

e.g.


`localhost:3000/power/shutdown?time=10`


```
curl --header "token: f64f2940-fae4-11e7-8c5f-ef356f27913" localhost:3000/power/logout

curl --header "token: f64f2940-fae4-11e7-8c5f-ef356f27913" localhost:3000/power/restart?time=10

curl --header "token: f64f2940-fae4-11e7-8c5f-ef356f27913" localhost:3000/music/syncSpotify?destination=AppleMusic
```

## Sample Scripts/Commands : 

### Power Command Type



## Writing Custom Scripts :

## Homebridge :

### Running Forever on Rasberry Pi

/shutdown?time=10
/restart
/halt
/logout
/sleep
/displaySleep
/ping


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