'use client'

import { useState } from "react";
import styles from "./Quiz.module.css";

import Translates from '@/static/Translates';
import Icons from '@/static/Icons';

// TODO: shuffle

export default function Quiz({config}) {
	const [completed, setCompleted] = useState(false);
	return <div className={`${styles["box"]}`}>
		{
			config.items.map((e, key) => 
				<QuizItem 
					key={key} 
					completed={completed} 
					config={e} 
					letter={String.fromCharCode('A'.charCodeAt(0) + key)} 
					onCorrect={() => setCompleted(true)}
				/>)
		}
	</div>
}


function QuizItem({completed, config, letter, onCorrect}) {
	const [selected, setSelected] = useState(false);
	return <div className={`${styles["item-box"]} ${styles[completed ? "completed" : "uncompleted"]}`
		+ ((completed||selected)?` ${styles["selected"]} ${styles[config.correct ? "correct" : (selected ? "wrong" : "wrong-unselected")]}`:"")} onClick={e => {
		if(config.correct) onCorrect();
		if(!completed) setSelected(s => true);
	}}>
		<div className={styles["item-letter"]}>{letter}</div>
		<div>{config.value}</div>
	</div>
}