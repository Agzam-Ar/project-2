'use client'

import { useState } from "react";
import styles from "./TestField.module.css";

import Translates from '@/static/Translates';
import Icons from '@/static/Icons';
import Prefs from '@/util/Prefs';

export default function TestField({config, onComplete}) {


    const parseRegexp = (str, def=str) => {
        if(str.startsWith("/")) {
            let match = str.match(new RegExp('^/(.*?)/([gimy]*)$'));
            if(match == null) return def;
            if(match[1] == undefined) return def;
            if(match[2] == undefined) return def;
            return new RegExp(match[1], match[2]);
        }
        return def;
    }

    const validator = parseRegexp(config.validator);

  	const [errAnimation, setErrAnimation] = useState(false);

	const [value, setValue] = useState('');
	const [answer, setAnswer] = useState('');
	
	const empty = /^\s*$/.test(value);
	const wrongInput = !empty && validator != undefined && validator instanceof RegExp && !validator.test(value);

	const check = (answer) => {
		if(config.answer instanceof RegExp) return config.answer.test(answer);
		if(Array.isArray(config.answer)) return config.answer.includes(answer);
		return config.answer == answer;
	}

	const correct = check(answer);

	const onEnter = () => {
		setAnswer(value);
		if(check(value)) {
			onComplete();
			return;
		}
		if(!errAnimation) setErrAnimation(a => true);
	};
	const boxCheckClass = correct ? 'correct' : wrongInput ? 'wrong-input' : 'default';
	return (
		<div onAnimationEnd={e => {
			setErrAnimation(a => false);
		}} className={`${styles["box"]} ${styles[boxCheckClass] + (errAnimation?` ${styles["wrong-animation"]}`:"")}`}>
			<input className={`${styles["input"]}`} type="text" onKeyDown={e => {
				if(e.code == 'Enter' && !(empty||wrongInput||correct)) onEnter();
			}} onChange={e => setValue(e.target.value)}
			disabled={correct}
			></input>
			<div onClick={e => onEnter()} className={`${styles["check"]} ${styles[empty||wrongInput||correct ? "empty" : "default"]}`} disabled={correct||empty||wrongInput}>{Icons.enter}</div>
		</div>
	)
}

