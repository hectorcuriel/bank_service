const bankService = require('../services/bankServices');
const accountType = require('../models/AccountTypeModel');
//const bankService = require('../services/bankServices');

exports.list_all_tasks = async function(req, res, next) {
  try {
    res.json(await bankService.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting accounts `, err.message);
    next(err);
  }

};

