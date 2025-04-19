'use client'

import styles from './AnimatedNumber.module.css'

export default function AnimatedNumber({startValue, targetValue}) {
	let digits = [];
	let repeats = Math.log10(Math.max(startValue, targetValue)+1);
	for(let m = 1; m <= Math.max(startValue, targetValue); m *= 10) {
		let s = startValue/m%10;
		let t = targetValue/m%10;
		let str = "";
		for(let r = 1; r < repeats; r++) {
			for(let i = 0; i <= 9; i++) {
				if(str.length > 0) str = '\n' + str;
				str = i + str;
			}
		}
		for(let i = s; i <= t; i++) {
			if(str.length > 0) str = '\n' + str;
			str = i + str;
		}
		digits.unshift(<span key={digits.length} className={styles.digit} style={{
			animationDuration: `${.5 + repeats}s`,
		}}>{str}</span>);
		repeats--;
	}

	if(digits.length == 0) {
		digits.unshift(<span key={digits.length}>{0}</span>);
	}

	return <div className={styles.box}>
		{digits}
	</div>
}