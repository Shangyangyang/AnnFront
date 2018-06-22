import Schema from 'async-validator'

function initValidator() {
	
	var checkNum = (rule, value, callback) => {
		for(let i = 0; i < value.length; i++){
			let s = value.charAt(i);
			if(("0123456789").indexOf(s) == -1){
				return callback(new Error(rule.message));
			}
		}			
	};
	
	var checkPhone = (rule, value, callback) => {
		let rex1 = /^1\d{10}$/;
		let rex2 =  /^0\d{2,3}-?\d{7,8}$/;
		if(!rex1.test(value) && !rex2.test(value)){
			return callback(new Error(rule.message));	
		}	
	};
	
	Schema.register("number",checkNum);
	Schema.register("number2",checkNum);
	Schema.register("phone",checkPhone);
}

export default initValidator