const fs = require('fs');
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'test/' });
const app = express();
const port = 9000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/', (req, res) => {
  res.send('hello express!');
});
app.post('/profile', upload.single('avatar'), (req, res) => {
  console.log(req.file);
  res.send(req.file.filename);
});
app.get('/preview/:img', (req, res) => {
  fs.readFile(`./test/${req.params.img}`, (err, data) => {
    if (err) res.send('read file err');
    res.send(data);
  });
});
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});