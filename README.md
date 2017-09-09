### Gamgi Backend Project

##### initil mysql setup. create user
	# type scripts in create_user.sql on mysql cmdline

##### initial mysql setup. create tables
	$ mysql -u jeffrey -p gamgi < create_tables.sql

##### rum mysql server
	$ sudo service mysql start

##### run server (foreground)
	$ cd gamgi
	$ npm install
	$ npm start

##### run server (background)
	$ cd gamgi
	$ npm install
	$ forever start app.js

### Gamgi Frontend Project
see https://github.com/ChanMinPark/9xd_hackathon_h