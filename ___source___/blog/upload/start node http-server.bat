REM // start with current location, where this .bat file is located.
cd .

REM // go to folder where your website lives starting from "this current location". In my case I put this .bat file in the Apache2 root folder of Apache server.
cd htdocs

REM // start http server (like Apache) in that folder. Server will be started with the context of that folder & only that folder.
REM // starting website from different location will require starting another instance of server from within that location.
REM // yes, you can have multiple server instances running simultaneously :-)
REM // why ? In order f.e. to simulate cross-site data exchange. In plain english, one site acts as a latest movies RESTful service, second site acts as a portal that fetches that latest movies  :-)
http-server