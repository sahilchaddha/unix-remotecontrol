# Unix Remote Control

Runs Scripts on Mac/Linux remotely.

### How it Works




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


var env = {
    port: '3000',
    pass: 'uncharted',
    logLevel: 'info',
    sessionToken: 'f64f2940-fae4-11e7-8c5f-ef356f279131'
}