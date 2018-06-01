const express = require('express');

const app = express();

app.get('/src', (req, res) => {
    const data = [
        {id: 1, name: 'Ibrohim', age: 22},
        {id: 2, name: 'Danny', age: 21},
        {id: 3, name: 'Jam', age: 20}
    ];

     res.json(data);
});

const port = 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));