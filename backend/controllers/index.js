const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const basename = path.basename(module.filename);

router.get('/', (req, res) => {
  res.render('home');
});

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const fileName = file.substr(0, file.length - 3);
    console.log(fileName);
    router.use(`/${fileName}`, require(`./${fileName}`));
  });



module.exports = router;