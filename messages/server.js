const http = require('http');
const url = require('url');
const server = http.createServer();

let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

server.listen(3000, () => {
  console.log('The HTTP server is listening at port 3000');
});


server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

const getAllMessages = response => {
  response.writeHead(200, { 'Content-type': 'text/plain' });
  response.write(JSON.stringify(messages));
  response.end();
};

const addMessage = (newMessage, response) => {
  messages.push(newMessage);
  response.writeHead(201, { 'Contet-type': 'text/plain' });
  response.write(JSON.stringify(newMessage));
  response.end();
};


// checks for understanding
// 1. What type of information is included in the header of a request?
// The following information may be included in a header: status code, http version, content-type, encoding and user agent information
//
// 2. What are the major RESTful methods and what do each of them do?
// GET: retrieve response information based on request parameters
// POST: create a new resourse
// PATCH: update a part of a specific resource
// PUT: update a whole resource
// DELETE: destroy a resource based on request parameters
//
// 3. What is Node?
// Node is a JavaScript environment that allows for javascript to be executed without a browser. Node is singlethreaded and runs asynchronously.
