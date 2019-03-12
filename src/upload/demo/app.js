const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 9000;
app.get('/', (req, res) => {
  res.send('hello express!');
});
app.post('/profile', upload.single('avatar'), (req, res) => {
  // console.log(req.file.filename);
  res.send(req.file.filename);
});
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});