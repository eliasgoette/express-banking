var express = require('express');
var router = express.Router();
const app = require('../app');

const appTitle = 'Express Banking';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: appTitle });
});

/* GET signin page. */
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: appTitle, subtitle: 'Account' });
});

/* Process POST of signin page. */
router.post('/submit-signin', function(req, res, next) {
  const newAccountEmailAddress = req.body['newAccountEmailAddress'];
  const newAccountPassword = req.body['newAccountPassword'];
  const newAccountRepeatPassword = req.body['newAccountRepeatPassword']; 
  const existingAccountEmailAddress = req.body['existingAccountEmailAddress']; 
  const existingAccountPassword = req.body['existingAccountPassword'];

  if(newAccountEmailAddress || existingAccountEmailAddress) {
    if(newAccountPassword === newAccountRepeatPassword && !existingAccountPassword) {
      res.redirect(`/account?message=Hello ${newAccountEmailAddress || existingAccountEmailAddress}`);
    } else if (existingAccountPassword) {
      res.redirect(`/account?message=Hello ${newAccountEmailAddress || existingAccountEmailAddress}`);
    } else {
      res.redirect(`/signin#newAccount?error=Passwords don't match`);
    }
  } else {
    res.redirect('/signin#newAccount?error=Please enter email address');
  }
});

module.exports = router;
