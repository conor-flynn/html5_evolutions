/*

*/

define([], function() {
	var TextInfo = Class.extend({
		init: function(id, info, position, color, stable){
			this.id = id;
			this.info = info;
			this.position = position;
			this.color = color;
			this.stable = 
				(
					stable !== undefined && 
					typeof stable === 'number' || 
					typeof stable === 'boolean') ? stable : 0;
		}
	});
	return TextInfo;
});