var express = require('express');
var router = express.Router();
const app = require('../app');

const appTitle = 'Express Banking';
const accountFilePath = `./BankAccounts.json`;

const BankAccount = require('../public/javascripts/BankAccount');
const fs = require('fs');

router.post('/create-account', async function(req, res, next) {
    const owner = req.body['owner'];
    const initialBalance = req.body['initialBalance'] || undefined;
    const currency = req.body['currency'] || undefined;
    const iban = req.body['iban'] || undefined;
    const name = req.body['name'] || undefined;

    let newAccountObj = new BankAccount(owner, initialBalance, currency, iban, name);

    if(fs.existsSync(accountFilePath)){
      let allAccounts = JSON.parse(fs.readFileSync(accountFilePath));
      allAccounts.BankAccounts.push(newAccountObj);
      fs.writeFileSync(accountFilePath, JSON.stringify(allAccounts))
    } else {
      let allAccounts = {BankAccounts: [newAccountObj]};
      fs.writeFileSync(accountFilePath, JSON .stringify(allAccounts));
    }
    
    res.statusCode = 200;
    res.redirect(`/account?message=Account "${newAccountObj.Name}" created`);
});

/* GET all bank accounts. */
router.get('/get-all-accounts', async function(req, res, next) {
  let bankAccounts;

  try {
    bankAccounts = fs.readFileSync(accountFilePath).toString();
  } catch (error) {
    bankAccounts = null;    
  }

  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.end(bankAccounts);
});

/* POST request to delete bank account. */
router.post('/delete-account', async function(req, res, next) {
  let delIBAN = req.query.delIBAN;

  let bankAccounts;
  let newBankAccounts = { BankAccounts: [] };

  try {
    bankAccounts = JSON.parse(fs.readFileSync(accountFilePath).toString());
    bankAccounts.BankAccounts.forEach(account => {
      if(account.IBAN !== delIBAN){
        newBankAccounts.BankAccounts.push(account);
      }
    });

    fs.writeFileSync(accountFilePath, JSON.stringify(newBankAccounts));
  } catch (error) {
    bankAccounts = null;    
  }

  if(bankAccounts !== null) {
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({success: true}));
  } else {
    res.statusCode = 400;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify({success: false}));
  }
});

module.exports = router;
