

const Prefs = {
	
	get: (name, def) => {
		if(localStorage == undefined) return def;
		let item = localStorage.getItem(`prefs-${name}`);
		if(item == null || (typeof item == 'number' && isNaN(item))) return def;
		return item;
	},

	set: (name, value) => {
		if(localStorage == undefined) return;
		localStorage.setItem(`prefs-${name}`, value);
	},
};


export default Prefs;