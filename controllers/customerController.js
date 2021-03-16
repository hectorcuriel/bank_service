const bankService = require('../services/bankServices');
const accountType = require('../models/CustomerModel');

const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

exports.createCustomer = async function(req, res) {
	
  try {
		
	if(!req.params){
		return res.status(400).json( 'Customer name is required');
	}else{
		  const rows = await db.query(
			`INSERT INTO customer (name) VALUES ( ? )`, 
			[req.params.name]
		  );
		  const data = helper.emptyOrRows(rows);
		  return res.status(200).json({ message: 'Customer created' });
	}	
	
  } catch (err) {
    console.error(`Error creating customer `, err.message);
	return res.status(500).json( 'Error creating customer ');

  }

};