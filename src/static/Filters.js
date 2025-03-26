
import Icons from '@/static/Icons';

const Pattle = {
	low: [`var(--filter-low)`, `var(--filter-low-background)`],
	normal: [`var(--filter-normal)`, `var(--filter-normal-background)`],
	high: [`var(--filter-high)`, `var(--filter-high-background)`],
};

const Filters = {
	difficulties: {
		name: "Сложность",
		icon: Icons.difficulty,
		values: [
			{
	    		name: "Легко",
				colors: Pattle.low,
			},
			{
	    		name: "Нормально",
				colors: Pattle.normal,
			},
			{
	    		name: "Сложно",
				colors: Pattle.high,
			}
		],
	    easy: {
	    	name: "Легко",
			colors: Pattle.low,
			desc: "легко",
			id: 0,
	    },
	    normal: {
	    	name: "Нормально",
			colors: Pattle.normal,
			desc: "нормально",
			id: 1,
	    },
	    hard: {
	    	name: "Сложно",
			colors: Pattle.high,
			desc: "сложно",
			id: 2,
	    },
	},
	durations: {
		pref: "filter-durations",
		name: "Время",
		icon: Icons.time,
		values: [
			{
	    		name: "Быстро",
				colors: Pattle.low,
			},
			{
	    		name: "Нормально",
				colors: Pattle.normal,
			},
			{
	    		name: "Долго",
				colors: Pattle.high,
			},
		],

	    short: {
	    	name: "Быстро",
			colors: Pattle.low,
			desc: "5-10 минут",
			id: 0,
	    },
	    normal: {
	    	name: "Нормально",
			colors: Pattle.normal,
			desc: "10-20 минут",
			id: 1,
	    },
	    long: {
	    	name: "Долго",
			colors: Pattle.high,
			desc: "20+ минут",
			id: 2,
	    },
	},
	priorities: {
		name: "Важность",
		icon: Icons.priority,
		values: [
			{
	    		name: "Основное",
				colors: Pattle.low,
			},
			{
	    		name: "Расширенное",
				colors: Pattle.normal,
			},
			{
	    		name: "Дополнительное",
				colors: Pattle.high,
			},
		],

	    base: {
	    	name: "Основное",
			colors: Pattle.low,
			desc: "на 3",
			id: 0,
	    },
	    advanced: {
	    	name: "Расширенное",
			colors: Pattle.normal,
			desc: "на 4",
			id: 1,
	    },
	    extra: {
	    	name: "Дополнительное",
			colors: Pattle.high,
			desc: "на 5",
			id: 2,
	    },   
	},
}



export default Filters;