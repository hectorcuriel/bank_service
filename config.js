const env = process.env;

const config = {
	
  transfer_fee : 1,	
	
  withdraw_limit : 500,
  
  saving_monthly_interest : 0.001,
		
  db: {
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'bankuser',
    password: env.DB_PASSWORD || '123456',
    database: env.DB_NAME || 'bank_service',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;