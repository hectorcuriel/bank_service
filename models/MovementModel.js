module.exports = {

  attributes: {


    amount:{
      type:'number',
      required:true
    },
	
    fee:{
      type:'number',
      required:false
    },

    total:{
      type:'number',
      required:true
    },	
	
    customeraccount:{
      model:'CustomerAccount'
    },
	
    movementtype:{
      model:'MovementType'
    }	
	

  },

};