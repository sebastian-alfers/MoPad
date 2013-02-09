MoPad
=====

A mobile game controller software system. Control your browser games via your mobile device.


* About MoPad: https://github.com/sebastian-alfers/MoPad/wiki/About
* Introduction to MoPad: https://github.com/sebastian-alfers/MoPad/wiki/Introduction

Live Usae
====

Currently, the MoPad is running on an micro Amazon AWS instance.

* `http://mo-pad.de/` - the gameCenter to list and start games
* `http://controller.mo-pad.de` - the controller. To be run on a WebKit (!) Mobile Device Browser or normal Browser (to run on a non-mobile browser, you have to simulate touch-events (Chrome -> Developer -> Settings -> Overrides -> check the `Emulate touch events` box
* `http://admin.mo-pad.de` - the admin (user: `admin` password `m0padadmin`

Note: the colored circle on the top-right corner of the gameCenter indicates the status of the notJS server:

* green: all ok
* red: server has an error, e.g. nodeJs is down. now, you can not connect to the WeSocket server that causes also that not games are listed


Installation
=====
For installation, the following software components are required:

* php >= 5.3.6, apache webserver, nodeJs >= 0.8.11, mySql 5.5.9


We recommend XAMP for windows or MAMP for mac.

Overview
=====
The following workflow needs to be installed:

* The webserver has to point to the root directory of this repository with the vhost `mopad.loc`
* start the bridge with the command `node ./bridge/app.js` or `./bridge/app_js_daemon.sh` (as daemon) from the root directory of this repository. now, a nodeJS server is running and listens to the port 8081
* now, you can acces the gameCenter ( `http://mopad.loc/gameCenter/` ) and a controller ( `http://mopad.loc/controller/` )
* point another vhost with the name `mopad-symfony.de` to the directory `misc/synfony-test/symfony/web/` . The webserver requires 'mod_rewrite' to be installed. Now you can access the gameAdmin `http://mopad-symfony.de/`
* If you have problems while running the gameAdmin, see https://github.com/sebastian-alfers/MoPad/wiki/Game-Admin-Installationsanleitung-(Symfony2)
