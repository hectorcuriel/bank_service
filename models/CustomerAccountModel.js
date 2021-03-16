module.exports = {

  attributes: {


    balance:{
      type:'number',
      required:true
    },
	
    customer:{
      model:'Customer'
    },
	
    accounttype:{
      model:'AccountType'
    }	
	

  },

};