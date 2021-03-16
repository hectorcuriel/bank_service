const bankService = require('../services/bankServices');
const accountType = require('../models/CustomerAccountModel');

const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

exports.createChecking = async function(req, res) {
	
  try {

	if(!req.params){
		return res.json({message:'customer id and balance is required'});
	}else{			
		const rows = await db.query(
		`SELECT  id FROM customer WHERE id = ? LIMIT 1`, [req.params.idcustomer]
		);

		const customers = helper.emptyOrRows(rows);

		if(customers.length == 0){			  
			//return res.json( 'Error getting customer information '); 
			return res.status(400).json( 'The customer was not found or does not exist'); 
		} else {		
			
		  const insertAccount = await db.query(
			`INSERT INTO customeraccount (customer, accounttype, balance) VALUES ( ?, 1 , ?) `, 
			[req.params.idcustomer, req.params.balance]
		  );
		  const data = helper.emptyOrRows(insertAccount);
		  //return res.json( data );
		  return res.status(200).json({ message: 'Checking account created' });
		}
	}	
	
	     
  } catch (err) {
    console.error(`Error creating account `, err.message);
	return res.status(500).json( 'Error creating account ');

  }

},

exports.createSaving = async function(req, res) {
	
  try {

	if(!req.params){
		return res.json({message:'customer id and balance is required'});
	}else{			
		const rows = await db.query(
		`SELECT  id FROM customer WHERE id = ? LIMIT 1`, [req.params.idcustomer]
		);

		const customers = helper.emptyOrRows(rows);

		if(customers.length == 0){
			//return res.json( 'Error getting customer information '); 
			return res.status(400).json( 'The customer was not found or does not exist');
		} else {		
			
		  const insertAccount = await db.query(
			`INSERT INTO customeraccount (customer, accounttype, balance) VALUES ( ?, 2 , ?) `, 
			[req.params.idcustomer, req.params.balance]
		  );
		  const data = helper.emptyOrRows(insertAccount);
		  //return res.json( data );
		  return res.status(200).json({ message: 'Saving account created' });
		}		
	}
		    
  } catch (err) {
    console.error(`Error creating account `, err.message);
	//return res.json( 'Error creating account ');
	return res.status(500).json({ message: 'Error creating account' });

  }

};