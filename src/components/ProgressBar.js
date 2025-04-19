'use client'


import styles from './ProgressBar.module.css'
import AnimatedNumber from './text/AnimatedNumber'


export default function ProgressBar({value, maxValue}) {
    if(value == 0 && maxValue == 0) {
        return <div className={styles.box}></div>
    }
	return <div className={styles.box}>
            <div className={styles.fill} style={{
                maxWidth: `${value*100/maxValue}%`,
                animationDuration: `${Math.log10(Math.max(Math.round(value*100/maxValue), value)+1) + .5}s`,
            }}
            ></div>
            <AnimatedNumber startValue={0} targetValue={value}/>/{maxValue} (<AnimatedNumber startValue={0} targetValue={Math.round(value*100/maxValue)}/>%)
        </div>
}


