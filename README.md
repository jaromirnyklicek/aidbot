#Aidbot
Web & Jabber based chat for realtime customer support. Written in JavaScript (Node.js & AngularJS).  
Created as my personal project at Masaryk University.

##Starring
* Backend: [Node.js](http://nodejs.org) and XMPP server of your choice
* Persistence store: [MySQL](http://mysql.com)
* Frontend: [AngularJS](http://angularjs.org) & [Bower](https://github.com/bower/bower)
* ...and last but not least, awesome Socket.IO

##Instalation
###Environment
* You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) for installing NodeJS applications and libraries.  
* You also need to install [MySQL](http://mysql.com). Download MySQL Community Server from [their website](http://dev.mysql.com/downloads/). 
* XMPP server is also necessary, sorry. Choose one than suits you the best, for me it is [ejabberd](http://www.ejabberd.im/). Find some tutorial, install it and configure it. It doesn't take more than half an hour.
* Last prerequisity is fronend dependency manager called [Bower](https://github.com/bower/bower). Simply install it via NPM by typing:


    npm install -g bower

###Application
Use git to clone the [official repository](https://github.com/jaromirnyklicek/aidbot):

    git clone git@github.com:jaromirnyklicek/aidbot.git

Aidbot relies upon some 3rd party libraries. You need to install these:

    npm install
    bower install

### Configure Server
The server stores its data in a MySQL database.
* Create an account and database at your local MySQL server (installed in step one).
* Edit `database.js` to set your MySQL credentials and database name.
* Run `dump.sql` script to initialize the database with a first admin user (john.doe : john).
* Create user john.doe with the same password also in your XMPP server.


And that's all. Just run `node app.js` in the application directory and in your browser, navigate to 
`http://localhost:8080/admin`. Login as john.doe and explore the Aidbot.


##Integration
Login to administration interface and navigate to "Settings". There is an integration code - copy/paste it to HTML template of your website. You needn't do anything more.


