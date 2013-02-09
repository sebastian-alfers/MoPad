MoPad
=====

A mobile game controller software system. Control your browser games via your mobile device.


* About MoPad: https://github.com/sebastian-alfers/MoPad/wiki/About
* Introduction to MoPad: https://github.com/sebastian-alfers/MoPad/wiki/Introduction


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
