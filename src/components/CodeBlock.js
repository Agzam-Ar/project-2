'use client'

import Prism from "prismjs";
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-markdown';

import styles from "./CodeBlock.module.css";

import { MdContentCopy } from "react-icons/md";

import { useState } from "react";

function getTokenList(code, language) {
	if(code == undefined) return [];
	if(language == undefined) return code;
    const grammar = Prism.languages[language];
	if(grammar == undefined) return code;
    return Prism.tokenize(code, grammar);
}

export default function CodeBlock({lang, code}) {
	const tokens = getTokenList(code, lang);
    let key = 0;
    const toElements = (tokens) => {
        let elements = [];
        for (let token of tokens) {
            let value = "";
            let type = "";
            if(typeof token == 'string') {
                value = token;
                type = "default";
            } else {
                value = token.content;
                if(Array.isArray(value)) value = toElements(value);
                type = token.type;
            }
            if(typeof value != 'string') console.log('value is not string', value, typeof value);
            elements.push(<span 
                key={key++} 
                style={{
                    color: `var(--code-${type+""})`
                }}
                className={styles[`code-${type+""}`]}
            >{value}</span>);
        }
        return elements;
    };

	return <div className={styles["box"]}>
		<div className={styles["info-box"]}>
			<div className={styles["lang"]}>
				{lang}
			</div>
			<div className={styles["copy-box"]}>
				<MdContentCopy/>
			</div>
		</div>
		<div className={styles["code-box"]}>{toElements(tokens)}</div>
	</div>;
}