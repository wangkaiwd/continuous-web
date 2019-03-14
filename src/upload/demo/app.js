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
  // console.log(req.file);
  res.send(req.file.filename);
});
app.get('/preview/:img', (req, res) => {
  // 相当于原生nodejs的fs.readFile
  // 通过设置绝对路径，来将对应的文件信息返回，并通过回调函数处理错误
  res.sendFile(`./test/${req.params.img}`, { root: __dirname }, err => {
    if (err) res.status(404).send('Not Found');
  });
});
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});