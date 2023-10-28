var express = require('express');
const app = require('../app');
var router = express.Router();

const appTitle = 'Express Banking';

/* Get account page */
router.get('/', function(req, res, next) {
    res.render('account', { title: appTitle, subtitle: 'Account' });
});

module.exports = router;