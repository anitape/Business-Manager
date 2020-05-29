# Business Manager
Business Manager is a REST API that is created for business contact information management.
Business Manager provides a platform where users can store and manage contact information of business companies.
The application includes CRUD (create, read, update and delete) operations.


## Technical Issues
Business Manager is connected to MySQL database, where all business information is initially stored. 
A RESTful backend is made with Node.js and Express. I found it difficult to cope with update option just using Express.
So I ended up to use ExpressJS framework, but only for update option. Actually, ExpressJS helps to save much time,
when you are trying to get information from server to client side. To receive information from server, mostly I have applied AJAX.
Data from both sides is transferring in JSON format. The application is designed with Bootstrap.

### Installing Express
Express framework is using NPM, so the NPM installation is required.
The command below saves the installation locally in the node_modules directory and creates a directory express inside node_modules.
```
  $ npm install express --save
```
The following module is also important along with express.
```
  $ npm install body-parser --save
```

### Installing Express JS
```
$ npm install ejs
```

## Application Images
Below is a screenshot which illustrates a main view of the application.

![Screenshot](public/img/businessmanager.jpg)

A screenshot represented below illustrates create option of Business Manager.

![Screenshot](public/img/createcompany.jpg)