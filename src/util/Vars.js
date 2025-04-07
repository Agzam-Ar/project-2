

const Vars = {
	
	env: {
		url: process.env.NODE_ENV == 'development' ? "http://localhost:3000/" : (process.env.URL == undefined ? 'https://github.com/Agzam-Ar/project-2/tree/main/public/articles' : process.env.URL),
	}
};


export default Vars;