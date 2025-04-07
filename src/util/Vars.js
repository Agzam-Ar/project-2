

const Vars = {
	
	env: {
		url: process.env.NODE_ENV == (process.env.URL == undefined ? 'https://github.com/Agzam-Ar/project-2/tree/main/public/' : process.env.URL),
	}
};


export default Vars;