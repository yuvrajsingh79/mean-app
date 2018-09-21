var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200);
    res.render("index.html");
});

module.exports = router;