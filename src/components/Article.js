'use client'

import { Suspense } from "react";
import ArticleParser from "@/util/ArticleParser";

import styles from "./Article.module.css";

async function ArticleContent({ markdown, url }) {
	const content = await ArticleParser.parse(markdown, url);
	return content;
}

export default function Article({markdown, url}) {
    // const content = await ArticleParser.parse(markdown, url);
	return ArticleParser.parse(markdown, url);
    // <Suspense fallback={<p>Загрузка статьи...</p>}>
      // <ArticleContent markdown={markdown} url={url}/>
    // </Suspense>;
}