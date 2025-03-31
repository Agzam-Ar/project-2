

const Vars = {
	
	env: {
		url: process.env.NODE_ENV == 'development' ? "" : (process.env.URL == undefined ? 'https://agzam-ar.github.io/project-2' : process.env.URL),
	}
};


export default Vars;