const express = require('express');
const router = express.Router();
//const bankService = require('../services/bankServices');

const accountTypeController = require('../controllers/accountTypeController');
const customerAccountController = require('../controllers/customerAccountController');
const customerController = require('../controllers/customerController');
const movementController = require('../controllers/movementController');
//const movementTypeController = require('../controllers/movementTypeController');


// Accounts
// GET info
router.get('/', accountTypeController.list_all_tasks);
// POST create customer
router.post('/account/:name', customerController.createCustomer);


// POST create checking account with initial balance (Can be zero)
router.post('/account/checking/:idcustomer/:balance', customerAccountController.createChecking);
router.post('/account/saving/:idcustomer/:balance', customerAccountController.createSaving);


// POST Deposit
router.post('/account/deposit/:idcustomer/:idaccounttype/:amount', movementController.depositMovement);
// POST Withdrawal

router.post('/account/withdrawal/:idcustomer/:idaccounttype/:amount', movementController.withdrawalMovement);
// POST Transfer
router.post('/account/transfertosaving/:idcustomer/:amount', movementController.transferToSaving);
router.post('/account/transfertochecking/:idcustomer/:amount', movementController.transferToChecking);

// GET Calculate interest
router.get('/movement/interestCalculation/:months', movementController.interestCalculation);


module.exports = router;