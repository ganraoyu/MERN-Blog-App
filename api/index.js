const express = require('express');
const app = express();

app.get('/register', (request, response) => {
    response.json('test ');
});

app.listen(4000);