'use client'

import Translates from "@/static/Translates";
import { useEffect, useState } from "react";

import styles from './Timer.module.css';

const dayToMs = 1000 * 60 * 60 * 24;

export default function Timer({targetDate, timeout}) {
	const [timer, setTimer] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	useEffect(() => {
    	const updater = setInterval(() => {
    		const now = new Date().getTime();
    		const target = targetDate;
    		const deltaTime = target - now;
			if (deltaTime <= 0) {
			  clearInterval(updater);
			  return;
			}
			setTimer({
				days: Math.floor(deltaTime / dayToMs),
				hours: Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
				minutes: Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)),
				seconds: Math.floor((deltaTime % (1000 * 60)) / 1000)
			});
   		}, 1000);
    	return () => clearInterval(updater);
  	}, [targetDate]);

	const format = n => n < 10 ? `0${n}` : n;

	return <div className={styles.box}>
		<TimerDigit digit={Math.floor(timer.days/100)}/> <TimerDigit digit={Math.floor(timer.days/10)}/><TimerDigit digit={timer.days%10}/> 
		{Translates.date.days} 
		<TimerDigit digit={Math.floor(timer.hours/10)}/><TimerDigit digit={timer.hours%10}/> 
		:
		<TimerDigit digit={Math.floor(timer.minutes/10)}/><TimerDigit digit={timer.minutes%10}/> 
		:
		<TimerDigit digit={Math.floor(timer.seconds/10)}/><TimerDigit digit={timer.seconds%10}/>
	</div>;
}


function TimerDigit({digit}) {

	const [previousTop, setPreviousTop] = useState(digit);
	const [previousBottom, setPreviousBottom] = useState(digit);

  	const [bottom, setBottom] = useState(digit);
  	const [top, setTop] = useState(digit);

  	useEffect(() => {
  		// setBottom(digit);
  		setTop(digit);
  	}, [digit]);

	return <div className={styles['digit-box']}>
		<span className={`${styles.n} ${styles.b}`}>{previousBottom}</span>
		<span attr={`${previousBottom} -> ${bottom}`} className={`${styles.c} ${styles.b} ${previousBottom == bottom ? '' : styles.a}`} onAnimationEnd={() => {
			setPreviousBottom(bottom);
		}}>{bottom}</span>

		<span className={`${styles.n} ${styles.t}`}>{top}</span>
		<span attr={`${previousTop} -> ${top}`} className={`${styles.c} ${styles.t} ${previousTop == top ? '' : styles.a}`} onAnimationEnd={() => {
			setPreviousTop(top);
			setBottom(digit);
		}}>{previousTop}</span>
		
		{/*<span className={`${styles.current} ${styles.bottom}`}>{digit}</span>
		<span className={`${styles.next} ${styles.bottom} ${bottom == digit ? '' : styles.a}`} onAnimationEnd={() => {
			setBottom(() => digit);
		}}>{bottom}</span>*/}


		{/*<span className={`${styles.current} ${styles.top}`}>{digit}</span>
		<span className={`${styles.next} ${styles.top} ${top == digit ? '' : styles.a}`} onAnimationEnd={() => {
			setTop(() => digit);
		}}>{top}</span>*/}
	</div>
}