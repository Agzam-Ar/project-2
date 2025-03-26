'use client'

import { use, Suspense } from "react";

import styles from "./Article.module.css";

function ArticleContent({articlePromise}) {
	const article = use(articlePromise);
	if(article == null || article == undefined) return undefined;
	return <div className={styles["article-box"]}>{article}</div>;
}

export default function Article({articlePromise}) {
	if(articlePromise == null) return undefined;
	return (
		<Suspense fallback={<p>Загрузка...</p>}>
			<ArticleContent articlePromise={articlePromise}/>
		</Suspense>
	)
}