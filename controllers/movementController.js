const bankService = require('../services/bankServices');
const accountType = require('../models/CustomerAccountModel');
const movement = require('../models/MovementModel');
const customerAccount = require('../models/customerAccountModel');

const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

exports.depositMovement = async function(req, res) {
	
  try {

	if(!req.params){
		return res.json({message:'customer id, account type and amount is required'});
	}else{ 		  
		  
		  // Get id of the received customer's account to deposit (if it exists).
		  const rows = await db.query(
			`SELECT  id FROM customeraccount WHERE  customer = ? AND accounttype = ? LIMIT 1`, 
			[req.params.idcustomer, req.params.idaccounttype]
		  );
		  
		  const idAccount = helper.emptyOrRows(rows);
		  
		  if(!idAccount){			  
				return res.status(400).json( 'Error getting customer account information');
		  } else {
			  			
			let total = req.params.amount;
					
			const updatedrows = await db.query( `UPDATE customeraccount SET balance = balance + ? WHERE id = ? `, [req.params.amount, idAccount[0].id]);
			var data_updated = helper.emptyOrRows(updatedrows);
			
			if(!data_updated){
				return res.status(500).json( 'Error getting customer account information');
			} else {				
			  const rows = await db.query(
				`INSERT INTO movement (customeraccount, movementtype, amount, fee, total) VALUES ( ?, 1 , ?, ?, ?) `, 
				[idAccount[0].id, req.params.amount, 0, total]
			  );
			  const data = helper.emptyOrRows(rows);				
			  
			  return res.status(200).json({ message: 'Deposit movement succesful' });
			}
		  
		  }
		  
	}		
	     
  } catch (err) {
    console.error(`Error trying to deposit in given account, `, err.message);
	return res.status(500).json( 'Error trying to deposit in given account ');

  }

},

exports.withdrawalMovement = async function(req, res) {
	
  try {

	if(!req.params){
		return res.json({message:'customer id, account type and amount is required'});
	}else{ 		  
		  
		  if(req.params.amount > config.withdraw_limit && req.params.idaccounttype == 1){
			  return res.status(400).json({message:'You can\'t withdraw from checking account over $' + config.withdraw_limit});
		  }
		  
		  // Get id of the received customer's account to withdrawl (if it exists and if it has enough money).
		  const rows = await db.query(
			`SELECT  id FROM customeraccount WHERE  customer = ? AND accounttype = ? AND balance >= ? LIMIT 1`, 
			[req.params.idcustomer, req.params.idaccounttype, req.params.amount]
		  );
		  
		  const idAccount = helper.emptyOrRows(rows);
		  
		  if(!idAccount){			  
			return res.status(400).json( 'Error getting customer account information');
		  } else {
			  			
			let total = req.params.amount;
					
			const updatedrows = await db.query( `UPDATE customeraccount SET balance = balance - ? WHERE id = ? `, [req.params.amount, idAccount[0].id]);
			var data_updated = helper.emptyOrRows(updatedrows);
			
			if(!data_updated){
				return res.status(500).json( 'Error trying to update balance account');
			} else {				
			  const rows = await db.query(
				`INSERT INTO movement (customeraccount, movementtype, amount, fee, total) VALUES ( ?, 2 , ?, ?, ?) `, 
				[idAccount[0].id, req.params.amount, 0, total]
			  );
			  const data = helper.emptyOrRows(rows);				
			 
			  return res.status(200).json({ message: 'Withdrawal movement succesful' });
			}									

		  }
		  
	}	
	
	     
  } catch (err) {
    console.error(`Error trying to withdrawal in given account, `, err.message);
	return res.status(500).json( 'Error trying to withdrawal in given account ');

  }

},

exports.transferToSaving = async function(req, res) {
	
  try {

	if(!req.params){
		return res.json({message:'customer id and amount is required'});
	}else{		  		 
		  
		  // Get id of the received customer's account from getting the amount and the destination account to transfer
		  const rows = await db.query(
			`SELECT id, accounttype, balance FROM customeraccount WHERE customer = ? AND accounttype = 2 UNION 
			SELECT ca.id, ca.accounttype, ca.balance FROM customeraccount ca WHERE ca.customer = ? AND ca.accounttype = 1`, 
			[req.params.idcustomer, req.params.idcustomer]
		  );
		  
		  const accountsToTransfer = helper.emptyOrRows(rows);
		 		  
		  if(accountsToTransfer.length < 2){			  
				return res.status(400).json( 'Error getting account required conditions '); 
		  } else {
			  				
				if(accountsToTransfer[1].balance < parseFloat(req.params.amount) + parseFloat(config.transfer_fee)){
					return res.status(400).json( 'Not enough money in the balance account. To transfer: $' + parseFloat(req.params.amount) + ' at least it\'s needed: $' + (parseFloat(req.params.amount) + parseFloat(config.transfer_fee)) ); 
				}					
							
				let total = parseFloat(req.params.amount);			

					  
				const updatedrows = await db.query( `UPDATE customeraccount SET balance = balance - ? WHERE id = ? `, [parseFloat(req.params.amount) + parseFloat(config.transfer_fee) , accountsToTransfer[1].id]);
				var data_updated = helper.emptyOrRows(updatedrows);
				
				const updatedrows_ = await db.query( `UPDATE customeraccount SET balance = balance + ? WHERE id = ? `, [total, accountsToTransfer[0].id]);
				var data_updated_ = helper.emptyOrRows(updatedrows_);
				
				if(!data_updated && !data_updated_){
					  return res.status(500).json( 'Error trying to update balance account');
				} else {				
				  const rows = await db.query(
					`INSERT INTO movement (customeraccount, movementtype, amount, fee, total) VALUES ( ?, 3 , ?, ?, ?) `, 
					[accountsToTransfer[0].id, parseFloat(req.params.amount) + parseFloat(config.transfer_fee), config.transfer_fee, total]
				  );
				  const data = helper.emptyOrRows(rows);
				  
				  return res.status(200).json({ message: 'Transfer to saving account succesful' });
				}			
			 
		  }		  
	}	
	
	     
  } catch (err) {
    console.error(`Error trying to transfer, `, err.message);
	return res.status(500).json( 'Error trying to transfer ');

  }

}
,

exports.transferToChecking = async function(req, res) {
	
  try {

	if(!req.params){
		return res.json({message:'customer id, account type and amount is required'});
	}else{		 
		  
		  // Get id of the received customer's account from getting the amount and the destination account to transfer
		  const rows = await db.query(
			`SELECT id, accounttype, balance FROM customeraccount WHERE customer = ? AND accounttype = 1 UNION 
			SELECT ca.id, ca.accounttype, ca.balance FROM customeraccount ca WHERE ca.customer = ? AND ca.accounttype = 2`,			
			[req.params.idcustomer, req.params.idcustomer]
		  );		  		 
		  
		  const accountsToTransfer = helper.emptyOrRows(rows);		 	
		  
		  if(accountsToTransfer.length < 2){			  
				return res.status(400).json( 'Error getting account required conditions '); 
		  } else {
			  				
				if(accountsToTransfer[1].balance < parseFloat(req.params.amount) + parseFloat(config.transfer_fee)){
					return res.status(400).json( 'Not enough money in the balance account. To transfer: $' + parseFloat(req.params.amount) + ' at least it\'s needed: $' + (parseFloat(req.params.amount) + parseFloat(config.fe)) ); 
				}					
							
				let total = parseFloat(req.params.amount);

					  
				const updatedrows = await db.query( `UPDATE customeraccount SET balance = balance - ? WHERE id = ? `, [parseFloat(req.params.amount) + parseFloat(config.transfer_fee) , accountsToTransfer[1].id]);
				var data_updated = helper.emptyOrRows(updatedrows);
				
				const updatedrows_ = await db.query( `UPDATE customeraccount SET balance = balance + ? WHERE id = ? `, [total, accountsToTransfer[0].id]);
				var data_updated_ = helper.emptyOrRows(updatedrows_);
				
				if(!data_updated && !data_updated_){
					return res.status(500).json( 'Error trying to update balance account');
				} else {				
				  const rows = await db.query(
					`INSERT INTO movement (customeraccount, movementtype, amount, fee, total) VALUES ( ?, 3 , ?, ?, ?) `, 
					[accountsToTransfer[0].id, parseFloat(req.params.amount) + parseFloat(config.transfer_fee), config.transfer_fee, total]
				  );
				  const data = helper.emptyOrRows(rows);
				  
				  return res.status(200).json({ message: 'Transfer to checking account succesful' });
				}			
			 
		  }		 
	}		
	     
  } catch (err) {
    console.error(`Error trying to transfer, `, err.message);
	return res.status(500).json( 'Error trying to transfer ');
  }

},

exports.interestCalculation = async function(req, res) {
	
  try {

	if(!req.params){
		return res.json({message:'months is required'});
	}else{
		  
		  //
		  const rows = await db.query(
			`SELECT id, balance FROM customeraccount WHERE accounttype = 2 AND Balance > 1000`
		  );
		  		 		  
		  const savingaccounts = helper.emptyOrRows(rows);		 		 
		  
		  var saving_balances = [];
		  var savingbalance = 0;
		  var idaccount = 0;
		  var months_counts = req.params.months;
		  
		  if(savingaccounts.length == 0){			  
				//return res.json( 'There are not saving accounts with the conditions to calculate interest'); 
				return res.status(400).json( 'There are not saving accounts with the conditions to calculate interest'); 
		  } else {
			  				
				for(i = 0; i < savingaccounts.length; i++){					
					
					idaccount = savingaccounts[i].id;
					savingbalance = savingaccounts[i].balance;
					
					while(months_counts > 0){
						savingbalance += (savingbalance * config.saving_monthly_interest);
						months_counts --;
					}					

					saving_balances[i] = { 'id': idaccount, 'balance':savingbalance };
									
					savingbalance = 0;
					months_counts = req.params.months;					
				}			
				
				
				const functionWithPromise = item => { //a function that returns a promise
				  return Promise.resolve('ok')				  
				}
				

				const anAsyncFunction = async item => {
				  const updateaccounts = await db.query( `UPDATE customeraccount SET balance = ? WHERE id = ? `, [item.balance, item.id]);
				}

				const updateData = async () => {
				  return Promise.all(saving_balances.map(item => anAsyncFunction(item)))
				}
				
				updateData().then(data => {
				  console.log('Saving accounts updated')
				})
					
				res.status(200).json({ message: 'Saving accounts updated' });						
				
		  }		 
	}		
	     
  } catch (err) {
    console.error(`Error trying to calculate interest, `, err.message);
	return res.status(500).json( 'Error trying to calculate interest ');
  }

};
