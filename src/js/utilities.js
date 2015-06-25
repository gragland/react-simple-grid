var Util = {

	mergeObjects: function(one, two){
		for (var name in two) { 
			one[name] = two[name]; 
		}
		return one;
	}

}

module.exports = Util;