'use client'

import { Suspense, useMemo, useEffect, useState } from "react";
import ArticleParser from "@/util/ArticleParser";
import Vars from '@/util/Vars';

import styles from "./Article.module.css";

// async function ArticleContent({ url }) {
// 	console.log("fetching", url);
//     // const response = await fetch(baseUrl  + `/articles/${url}`);
//     // const markdown = await response.text();
// 	// const content = await ArticleParser.parse(markdown, url);
// 	// return content;
// 	return "a";
// }

// export default function Article({url}) {
// 	return (<div>
// 		<Suspense fallback={<p>Загрузка статьи...</p>}>
//     		<ArticleContent url={url}/>
//     	</Suspense>
//     </div>);
// }


export default function Article({data}) {
	const [ content, setContent ] = useState("loading");

	useEffect(() => {
		setContent(ArticleParser.build(data));
	}, []);

	return (<div>{content}</div>);
}