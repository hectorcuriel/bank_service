# bank_service
bank service simulation

API RESTful created with nodejs and express js

It uses as DataSource a MySQL database. The dump is included with the code: bank_service_dump.sql

>node index.js

Example of calls to endpoints:

// Customers, customer's accounts and balances
GET 
http://localhost:3000/bank_service

// Creating a customer named: 'Eve'
POST 
http://localhost:3000/bank_service/account/Eve

// Using customer id, creating a Check account with initial balance of 5000
POST
http://localhost:3000/bank_service/account/checking/35/5000

// Same case for Saving account
POST
http://localhost:3000/bank_service/account/saving/32/5000

// Using customer id, making a deposit to Checking account (1 Checking, 2 Saving) for 1000
POST
http://localhost:3000/bank_service/account/deposit/35/1/1000

// Using customer id, making a deposit to Saving account (1 Checking, 2 Saving) for 2000
POST
http://localhost:3000/bank_service/account/deposit/35/2/2000

// Using customer id, making a withdrawal from Checking account of 500
POST
http://localhost:3000/bank_service/account/withdrawal/35/1/500

// Using customer id, making a withdrawal from Saving account of 500
POST
http://localhost:3000/bank_service/account/withdrawal/35/2/500

// Using customer id, making a transfer to Saving account of 500
POST
http://localhost:3000/bank_service/account/transferToSaving/35/500

// Using customer id, making a transfer to Checking account of 200
POST
http://localhost:3000/bank_service/account/transferToChecking/35/200

// Calculating interest for all Saving accounts; passing the months to calculate
GET 
http://localhost:3000/bank_service/movement/interestCalculation/3
