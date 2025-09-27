//App.js contaains all the code of node.js.
to run the code
use command - nodemon app.js / node app.js

(req,res) => {} == request handler function

app.use() == matches all the HTTP methods in api calls
bcoz of that we use different method using express like get, post,put, delete.

app.get("/user") == this will only do get call to user.

what is middleware?

In Node.js (with Express), a middleware is just a function that sits between the request and the response.
It has access to:
The request object (req)
The response object (res)
A next function that passes control to the next middleware in the chain.

Types of middleware:
Application-level: app.use((req, res, next) => {...})
Router-level: middleware bound to specific routes
Built-in: e.g. express.json(), express.static()
Error-handling: special signature (err, req, res, next)


it is helpfull in login credentials
cookies = cookie is like a temporary password which will come in all the request to the server.


