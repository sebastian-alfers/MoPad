MoPad
=====

A mobile game controller software system. Control your browser games via your mobile device.


* About MoPad: https://github.com/sebastian-alfers/MoPad/wiki/1)-About

Components
====

* Controller - https://github.com/sebastian-alfers/MoPad/wiki/2.1)-Controller
* Bridge - https://github.com/sebastian-alfers/MoPad/wiki/2.2)-Bridge
* GameCenter - https://github.com/sebastian-alfers/MoPad/wiki/2.3)-GameCenter
* Admin - https://github.com/sebastian-alfers/MoPad/wiki/2.4)-GameAdmin

Live Usage
====

Currently, the MoPad is running on an micro Amazon AWS instance.

* `http://mo-pad.de/` - the gameCenter to list and start games
* `http://controller.mo-pad.de` - the controller. To be run on a WebKit (!) Mobile Device Browser or normal Browser (to run on a non-mobile browser, you have to simulate touch-events (Chrome -> Developer -> Settings -> Overrides -> check the `Emulate touch events` box
* `http://admin.mo-pad.de` - the admin (user: `admin` password `m0padadmin`)

Note: the colored circle on the top-right corner of the gameCenter indicates the status of the Node.js server:

* green: all ok
* red: server has an error, e.g. Node.js is down. Now, you can not connect to the WeSocket server that causes also that not games are listed


Installation
=====
For installation, the following software components are required:

* PHP >= 5.3.6, Apache webserver, Node.js >= 0.8.11, mySql 5.5.9


We recommend XAMPP for windows or MAMP for mac.

Overview
=====
The following workflow describes the installation process

* The webserver has to point to the root directory of this repository with the vhost `mopad.loc`
* start the bridge with the command `node ./bridge/app.js` or `./bridge/app_js_daemon.sh` (as daemon) from the root directory of this repository. now, a nodeJS server is running and listens to the port 8081
* now, you can acces the gameCenter ( `http://mopad.loc/gameCenter/` ) and a controller ( `http://mopad.loc/controller/` )
* point another vhost with the name `mopad-symfony.de` to the directory `misc/synfony-test/symfony/web/` . The webserver requires 'mod_rewrite' to be installed. Now you can access the gameAdmin `http://mopad-symfony.de/`
* If you have problems while running the gameAdmin, see https://github.com/sebastian-alfers/MoPad/wiki/GameAdmin-(Symfony2)-Setup


Further information can be found at https://github.com/sebastian-alfers/MoPad/wiki/
